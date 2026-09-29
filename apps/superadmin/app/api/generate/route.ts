import { NextResponse } from "next/server";
import fs from "fs";
import os from "os";
import path from "path";
import { generateProject } from "@platform/scaffold-cli/lib/generateProject";
import { zipDirectory } from "@platform/scaffold-cli/lib/zipDirectory";
import { IMPLEMENTED_MODULE_IDS } from "@platform/scaffold-cli/lib/moduleCatalog";
import { isAuthenticated } from "../../../lib/auth";

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { clientName, slug, template, enabledModules } = body as {
    clientName?: string;
    slug?: string;
    template?: string;
    enabledModules?: string[];
  };

  if (!clientName || !slug || !template) {
    return NextResponse.json(
      { success: false, message: "clientName, slug and template are required." },
      { status: 400 }
    );
  }

  if (!SLUG_PATTERN.test(slug)) {
    return NextResponse.json(
      { success: false, message: "Slug must be lowercase letters, numbers and hyphens only." },
      { status: 400 }
    );
  }

  const safeModules = Array.isArray(enabledModules)
    ? enabledModules.filter((id) => IMPLEMENTED_MODULE_IDS.includes(id))
    : IMPLEMENTED_MODULE_IDS;

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "superadmin-"));
  const outDir = path.join(tempDir, slug);
  const zipPath = path.join(tempDir, `${slug}.zip`);

  try {
    await generateProject({
      clientName,
      slug,
      template,
      enabledModules: safeModules,
      outDir,
      git: false,
      migrate: false,
    });

    await zipDirectory(outDir, zipPath);

    const zipBuffer = fs.readFileSync(zipPath);
    return new NextResponse(new Uint8Array(zipBuffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${slug}.zip"`,
      },
    });
  } catch (error) {
    console.error("Generate Error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to generate project." },
      { status: 500 }
    );
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
