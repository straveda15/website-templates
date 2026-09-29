#!/usr/bin/env node
/**
 * CLI wrapper around generateProject() for local dev/testing - writes
 * straight to clients/<slug> and, unlike the superadmin app's zip flow,
 * can optionally git-init and migrate a real database.
 *
 * Usage:
 *   node packages/scaffold-cli/scaffold.js --client "Test Co" --slug test-co --template furniture --git --migrate
 */
const path = require("path");
const { generateProject, REPO_ROOT } = require("./lib/generateProject");
const { IMPLEMENTED_MODULE_IDS } = require("./lib/moduleCatalog");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.slug) {
    console.error(
      "Usage: scaffold --client <name> --slug <slug> [--template furniture] [--out <dir>] [--modules a,b,c] [--git] [--migrate]"
    );
    process.exit(1);
  }

  const slug = args.slug;
  const clientName = args.client || slug;
  const outDir = path.resolve(args.out || path.join(REPO_ROOT, "clients", slug));
  const enabledModules = args.modules ? String(args.modules).split(",").map((m) => m.trim()) : IMPLEMENTED_MODULE_IDS;

  console.log(`Scaffolding "${clientName}" (${args.template || "furniture"} template) into ${outDir}`);

  const result = await generateProject({
    clientName,
    slug,
    template: args.template || "furniture",
    enabledModules,
    outDir,
    port: args.port || "5000",
    db: {
      host: args["db-host"] || "localhost",
      port: args["db-port"] || "5432",
      name: args["db-name"],
      user: args["db-user"] || "postgres",
      password: args["db-password"] || "",
    },
    git: Boolean(args.git),
    migrate: Boolean(args.migrate) && !args["skip-migrate"],
  });

  if (result.migrationError) {
    console.warn(
      `Could not provision the database automatically (${result.migrationError}). ` +
        `Run this manually once Postgres is reachable:\n` +
        `  createdb <db name>\n` +
        `  psql -d <db name> -f backend/migrations/schema.sql`
    );
  } else if (result.migrated) {
    console.log("Database created and migrated.");
  }

  console.log(`\nDone. This is a standalone project - it has no dependency on the platform repo at runtime.`);
  console.log(
    `\nNext steps:\n  cd ${path.relative(process.cwd(), result.outDir) || "."}\n  npm install\n  npm run dev:backend\n  npm run dev:website\n  npm run dev:dashboard\n`
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
