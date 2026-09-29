const express = require("express");

module.exports = function createFollowUpsRouter(pool) {
  const router = express.Router();

  // GET ALL FOLLOW-UPS
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
        LEFT JOIN leads l ON f.lead_id = l.id
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

  // GET SINGLE FOLLOW-UP
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `
        SELECT
          f.id,
          f.lead_id,
          l.name AS lead_name,
          f.purpose,
          f.follow_up_date,
          f.follow_up_time,
          f.status
        FROM follow_ups f
        LEFT JOIN leads l ON f.lead_id = l.id
        WHERE f.id = $1
        `,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Follow-up not found",
        });
      }

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Get Follow-up Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch follow-up",
      });
    }
  });

  // CREATE FOLLOW-UP
  router.post("/", async (req, res) => {
    try {
      const { lead_id, purpose, follow_up_date, follow_up_time, status } =
        req.body;

      if (!lead_id || !follow_up_date) {
        return res.status(400).json({
          success: false,
          message: "lead_id and follow_up_date are required",
        });
      }

      const result = await pool.query(
        `
        INSERT INTO follow_ups (lead_id, purpose, follow_up_date, follow_up_time, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [
          lead_id,
          purpose || null,
          follow_up_date,
          follow_up_time || null,
          status || "Pending",
        ]
      );

      res.status(201).json({
        success: true,
        message: "Follow-up created successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Create Follow-up Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to create follow-up",
      });
    }
  });

  // UPDATE FOLLOW-UP
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { lead_id, purpose, follow_up_date, follow_up_time, status } =
        req.body;

      const result = await pool.query(
        `
        UPDATE follow_ups
        SET
          lead_id = COALESCE($1, lead_id),
          purpose = COALESCE($2, purpose),
          follow_up_date = COALESCE($3, follow_up_date),
          follow_up_time = COALESCE($4, follow_up_time),
          status = COALESCE($5, status)
        WHERE id = $6
        RETURNING *
        `,
        [lead_id, purpose, follow_up_date, follow_up_time, status, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Follow-up not found",
        });
      }

      res.json({
        success: true,
        message: "Follow-up updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Update Follow-up Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to update follow-up",
      });
    }
  });

  // DELETE FOLLOW-UP
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `DELETE FROM follow_ups WHERE id = $1 RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Follow-up not found",
        });
      }

      res.json({
        success: true,
        message: "Follow-up deleted successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Delete Follow-up Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to delete follow-up",
      });
    }
  });

  return router;
};
