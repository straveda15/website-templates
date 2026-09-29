const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const { createUpload } = require("./upload/createUpload");
const createAuthRouter = require("./routes/auth.routes");
const createCustomersRouter = require("./routes/customers.routes");
const createProductsRouter = require("./routes/products.routes");
const createOrdersRouter = require("./routes/orders.routes");
const createFollowUpsRouter = require("./routes/follow_ups.routes");
const createLeadsRouter = require("./routes/leads.routes");
const createPaymentsRouter = require("./routes/payments.routes");
const createShipmentsRouter = require("./routes/shipments.routes");
const createReturnsRouter = require("./routes/returns.routes");
const createRefundsRouter = require("./routes/refunds.routes");
const createAnalyticsRouter = require("./routes/analytics.routes");

const ALL_MODULE_IDS = [
  "leads",
  "customers",
  "products",
  "orders",
  "followups",
  "shipments",
  "returns",
  "refunds",
  "payments",
  "analytics",
];

function resolveEnabledModules(options, env) {
  if (options.enabledModules) return options.enabledModules;
  if (env.ENABLED_MODULES) return env.ENABLED_MODULES.split(",").map((m) => m.trim());
  return ALL_MODULE_IDS;
}

// Assembles one client's Express app from its own pool + env. Nothing here
// reaches back into any other client or into the superadmin - every piece
// is constructed fresh from the arguments passed in. Only routers whose
// module id is in `enabledModules` get mounted - an unchecked module in the
// superadmin project form is genuinely absent from the generated API, not
// just hidden in the dashboard UI.
function createApp(pool, env = process.env, options = {}) {
  const app = express();
  const enabled = resolveEnabledModules(options, env);
  const isEnabled = (id) => enabled.includes(id);

  const uploadsDir = env.UPLOADS_DIR || path.join(__dirname, "..", "uploads");
  fs.mkdirSync(uploadsDir, { recursive: true });
  const upload = createUpload(uploadsDir);

  const corsOrigins = (env.CORS_ORIGINS || "http://localhost:3000,http://localhost:3001")
    .split(",")
    .map((origin) => origin.trim());

  app.use(cors({ origin: corsOrigins, credentials: true }));

  // Stripe webhook needs the raw body for signature verification, so it must
  // be mounted before the global express.json() parser below.
  app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static(uploadsDir));

  app.get("/", (req, res) => {
    res.json({ success: true, message: `${env.CLIENT_NAME || "Client"} backend is running` });
  });

  app.get("/api/health", async (req, res) => {
    try {
      const result = await pool.query("SELECT NOW()");
      res.json({
        success: true,
        message: "Backend and PostgreSQL are connected",
        databaseTime: result.rows[0].now,
      });
    } catch (error) {
      console.error("Database Error:", error);
      res.status(500).json({ success: false, message: "Database connection failed" });
    }
  });

  // Always on - not a selectable module.
  app.use("/api/auth", createAuthRouter(pool, env));

  if (isEnabled("customers")) app.use("/api/customers", createCustomersRouter(pool));
  if (isEnabled("products")) app.use("/api/products", createProductsRouter(pool, { upload }));
  if (isEnabled("orders")) app.use("/api/orders", createOrdersRouter(pool));
  if (isEnabled("followups")) app.use("/api/follow-ups", createFollowUpsRouter(pool));
  if (isEnabled("leads")) app.use("/api/leads", createLeadsRouter(pool));
  if (isEnabled("payments")) app.use("/api/payments", createPaymentsRouter(pool, env));
  if (isEnabled("shipments")) app.use("/api/shipments", createShipmentsRouter(pool));
  if (isEnabled("returns")) app.use("/api/returns", createReturnsRouter(pool));
  if (isEnabled("refunds")) app.use("/api/refunds", createRefundsRouter(pool));
  if (isEnabled("analytics")) app.use("/api/analytics", createAnalyticsRouter(pool));

  return app;
}

module.exports = { createApp, ALL_MODULE_IDS };
