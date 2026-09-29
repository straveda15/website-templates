import type { NextConfig } from "next";
import path from "path";

// This app must run from inside the platform repo (apps/superadmin); it reads
// templates/ and packages/* directly. process.cwd() at config-load time is
// reliable even though __dirname inside bundled server code is not.
const REPO_ROOT = path.join(process.cwd(), "..", "..");

const nextConfig: NextConfig = {
  serverExternalPackages: ["@platform/scaffold-cli", "archiver", "pg"],
  env: {
    PLATFORM_REPO_ROOT: REPO_ROOT,
  },
};

export default nextConfig;
