const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// GET all orders
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        o.id,
        o.customer_id,
        c.name AS customer_name,
        o.amount,
        o.payment_status,
        o.order_status,
        o.created_at
      FROM orders o
      LEFT JOIN customers c
        ON o.customer_id = c.id
      ORDER BY o.id DESC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

module.exports = router;