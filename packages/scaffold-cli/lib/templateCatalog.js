const fs = require("fs");
const path = require("path");

function listTemplates(repoRoot) {
  const templatesDir = path.join(repoRoot, "templates");
  if (!fs.existsSync(templatesDir)) return [];

  return fs
    .readdirSync(templatesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ id: entry.name, label: entry.name.replace(/(^|-)\w/g, (c) => c.toUpperCase()).replace(/-/g, " ") }));
}

module.exports = { listTemplates };
