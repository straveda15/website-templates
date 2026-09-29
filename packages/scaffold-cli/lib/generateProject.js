const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execSync } = require("child_process");
const { Client } = require("pg");
const { IMPLEMENTED_MODULE_IDS } = require("./moduleCatalog");

// __dirname is unreliable when this package is pulled through a bundler
// (e.g. Next.js server components in apps/superadmin can rewrite it), so
// callers running under a bundler should set PLATFORM_REPO_ROOT explicitly.
const REPO_ROOT = process.env.PLATFORM_REPO_ROOT || path.join(__dirname, "..", "..", "..");

function copyDir(src, dest) {
  fs.cpSync(src, dest, {
    recursive: true,
    filter: (source) => {
      const base = path.basename(source);
      return !["node_modules", ".next", ".git", "dist", "build", "uploads"].includes(base);
    },
  });
}

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  for (const [pattern, value] of replacements) {
    content = content.replace(pattern, value);
  }
  fs.writeFileSync(filePath, content);
}

async function ensureDatabase(env) {
  const admin = new Client({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: "postgres",
  });

  await admin.connect();
  const exists = await admin.query("SELECT 1 FROM pg_database WHERE datname = $1", [env.DB_NAME]);
  if (exists.rowCount === 0) {
    await admin.query(`CREATE DATABASE "${env.DB_NAME}"`);
  }
  await admin.end();

  const client = new Client({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  });
  await client.connect();
  const schema = fs.readFileSync(path.join(REPO_ROOT, "packages", "backend-core", "migrations", "schema.sql"), "utf8");
  await client.query(schema);
  await client.end();
}

/**
 * Generates a standalone project (website + dashboard + backend, wired for
 * exactly the selected modules) into `outDir`. Everything is a physical
 * copy - the result has no runtime import back into this platform repo.
 *
 * Used by both the scaffold CLI (writes straight to clients/<slug> on this
 * machine, optionally git-inits and migrates a DB - for local dev/testing)
 * and the superadmin app (writes to a temp dir, zips it, never git-inits or
 * touches a database - the person unzipping it fills in the .env files).
 */
async function generateProject({
  clientName,
  slug,
  template = "furniture",
  enabledModules = IMPLEMENTED_MODULE_IDS,
  outDir,
  port = "5000",
  db = {},
  git = false,
  migrate = false,
}) {
  const templateDir = path.join(REPO_ROOT, "templates", template);
  if (!fs.existsSync(templateDir)) {
    throw new Error(`No such template: ${template} (looked in ${templateDir})`);
  }

  if (fs.existsSync(outDir) && fs.readdirSync(outDir).length > 0) {
    throw new Error(`Output directory already exists and is not empty: ${outDir}`);
  }

  fs.mkdirSync(outDir, { recursive: true });

  copyDir(templateDir, path.join(outDir, "website"));
  copyDir(path.join(REPO_ROOT, "packages", "dashboard-shell"), path.join(outDir, "dashboard"));
  copyDir(path.join(REPO_ROOT, "packages", "backend-core"), path.join(outDir, "backend"));
  fs.mkdirSync(path.join(outDir, "shared"), { recursive: true });
  copyDir(path.join(REPO_ROOT, "packages", "ui-kit"), path.join(outDir, "shared", "ui-kit"));

  // Point the copied website at the copied ui-kit instead of the workspace "*" version.
  replaceInFile(path.join(outDir, "website", "package.json"), [
    [/"@platform\/ui-kit":\s*"\*"/, '"@platform/ui-kit": "file:../shared/ui-kit"'],
  ]);

  // Branding
  replaceInFile(path.join(outDir, "website", "app", "site.config.ts"), [
    [/brandName: "Maison"/, `brandName: "${clientName}"`],
  ]);
  replaceInFile(path.join(outDir, "dashboard", "app", "dashboard.config.ts"), [
    [/brandName: "FURNITURE"/, `brandName: "${clientName.toUpperCase()}"`],
    [/footerText: ".*"/, `footerText: "© ${new Date().getFullYear()} ${clientName} · Commerce Dashboard"`],
  ]);

  const enabledCsv = enabledModules.join(",");

  const env = {
    CLIENT_NAME: clientName,
    PORT: port,
    DB_HOST: db.host || "",
    DB_PORT: db.port || "5432",
    DB_NAME: db.name || slug.replace(/-/g, "_"),
    DB_USER: db.user || "",
    DB_PASSWORD: db.password || "",
    JWT_SECRET: crypto.randomBytes(32).toString("hex"),
    CORS_ORIGINS: "http://localhost:3000,http://localhost:3001",
    ENABLED_MODULES: enabledCsv,
    STRIPE_SECRET_KEY: "",
    STRIPE_WEBHOOK_SECRET: "",
  };

  const envContent = Object.entries(env)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  fs.writeFileSync(path.join(outDir, "backend", ".env"), envContent + "\n");

  const frontendEnv = `NEXT_PUBLIC_API_URL=http://localhost:${port}\nNEXT_PUBLIC_ENABLED_MODULES=${enabledCsv}\n`;
  fs.writeFileSync(path.join(outDir, "website", ".env.local"), frontendEnv);
  fs.writeFileSync(path.join(outDir, "dashboard", ".env.local"), frontendEnv);

  // Root workspace for local convenience - still fully standalone, just this project's own workspace.
  fs.writeFileSync(
    path.join(outDir, "package.json"),
    JSON.stringify(
      {
        name: `client-${slug}`,
        private: true,
        workspaces: ["website", "dashboard", "backend", "shared/*"],
        scripts: {
          "dev:website": "npm run dev --workspace website",
          "dev:dashboard": "npm run dev --workspace dashboard",
          "dev:backend": "npm run dev --workspace backend",
        },
      },
      null,
      2
    ) + "\n"
  );

  fs.writeFileSync(
    path.join(outDir, ".gitignore"),
    ["node_modules/", ".next/", "dist/", "build/", "uploads/", ".env", ".env.local", "!.env.example"].join("\n") + "\n"
  );

  fs.writeFileSync(
    path.join(outDir, "README.md"),
    `# ${clientName}\n\nGenerated from the "${template}" template with modules: ${enabledCsv}.\n\n## Setup\n\n1. Fill in \`backend/.env\` (DB_HOST/DB_NAME/DB_USER/DB_PASSWORD, and Stripe keys if you use payments).\n2. Create the database and run \`backend/migrations/schema.sql\` against it.\n3. \`npm install\` at this directory's root (installs website, dashboard and backend together).\n4. \`npm run dev:backend\`, \`npm run dev:website\`, \`npm run dev:dashboard\` (each in its own terminal).\n`
  );

  let migrated = false;
  let migrationError = null;
  if (migrate) {
    try {
      await ensureDatabase(env);
      migrated = true;
    } catch (error) {
      migrationError = error.message;
    }
  }

  if (git) {
    execSync("git init", { cwd: outDir, stdio: "ignore" });
    execSync("git add -A", { cwd: outDir, stdio: "ignore" });
    execSync(`git commit -m "Initial commit: ${clientName} generated from ${template} template"`, {
      cwd: outDir,
      stdio: "ignore",
    });
  }

  return { outDir, env, migrated, migrationError };
}

module.exports = { generateProject, REPO_ROOT };
