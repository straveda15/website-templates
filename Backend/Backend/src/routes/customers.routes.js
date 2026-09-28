const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// GET all customers
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        phone,
        email,
        address,
        created_at
      FROM customers
      ORDER BY id DESC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get Customers Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
    });
  }
});

module.exports = router;