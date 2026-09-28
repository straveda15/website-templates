const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// GET all follow-ups
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        f.id,
        f.lead_id,
        l.name AS lead_name,
        f.purpose,
        f.follow_up_date,
        f.follow_up_time,
        f.status
      FROM follow_ups f
      LEFT JOIN leads l
        ON f.lead_id = l.id
      ORDER BY f.follow_up_date ASC, f.follow_up_time ASC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get Follow-ups Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch follow-ups",
    });
  }
});

module.exports = router;