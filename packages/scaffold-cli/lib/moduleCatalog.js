// Single source of truth for the superadmin's checkbox list and the CLI's
// defaults. Keep ids in sync with packages/dashboard-shell/app/modules.config.ts
// (MODULE_CATALOG) and packages/backend-core/src/createApp.js (ALL_MODULE_IDS).
const MODULE_CATALOG = [
  { id: "leads", label: "Leads & CRM", implemented: true },
  { id: "followups", label: "Follow-ups", implemented: true },
  { id: "quotations", label: "Quotations", implemented: false },
  { id: "customers", label: "Customers", implemented: true },
  { id: "products", label: "Products", implemented: true },
  { id: "categories", label: "Categories", implemented: false },
  { id: "orders", label: "Orders", implemented: true },
  { id: "payments", label: "Payments", implemented: true },
  { id: "shipments", label: "Shipments", implemented: true },
  { id: "returns", label: "Returns", implemented: true },
  { id: "refunds", label: "Refunds", implemented: true },
  { id: "inventory", label: "Inventory", implemented: false },
  { id: "reviews", label: "Reviews", implemented: false },
  { id: "analytics", label: "Analytics", implemented: true },
  { id: "users", label: "Users & Roles", implemented: false },
  { id: "settings", label: "Settings", implemented: false },
];

const IMPLEMENTED_MODULE_IDS = MODULE_CATALOG.filter((m) => m.implemented).map((m) => m.id);

module.exports = { MODULE_CATALOG, IMPLEMENTED_MODULE_IDS };
