const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const customersRoutes = require("./routes/customers.routes");

const productsRoutes = require("./routes/products.routes");

const ordersRoutes = require("./routes/orders.routes");

const followUpsRoutes = require("./routes/follow_ups.routes");

const leadsRoutes = require("./routes/leads.routes");


const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Furniture Website Backend is running",
  });
});

app.use("/api/customers", customersRoutes);

app.use("/api/products", productsRoutes);

app.use("/api/orders", ordersRoutes);

app.use("/api/follow-ups", followUpsRoutes);

app.use("/api/leads", leadsRoutes);
// PostgreSQL health check
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

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});
// Get all leads
app.get("/api/leads", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        phone,
        email,
        interested_in,
        status,
        next_follow_up,
        created_at
      FROM leads
      ORDER BY id DESC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Leads Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});