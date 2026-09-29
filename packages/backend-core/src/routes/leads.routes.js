const express = require("express");

// Factory: each generated client backend calls createLeadsRouter(pool)
// against its own database - no shared runtime state between clients.
module.exports = function createLeadsRouter(pool) {
  const router = express.Router();

  // GET ALL LEADS
  router.get("/", async (req, res) => {
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
      console.error("Get Leads Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch leads",
      });
    }
  });

  // GET SINGLE LEAD
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `
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
        WHERE id = $1
        `,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Lead not found",
        });
      }

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Get Lead Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch lead",
      });
    }
  });

  // CREATE NEW LEAD
  router.post("/", async (req, res) => {
    try {
      const { name, phone, email, interested_in, status, next_follow_up } =
        req.body;

      if (!name || !phone || !email) {
        return res.status(400).json({
          success: false,
          message: "Name, phone and email are required",
        });
      }

      const result = await pool.query(
        `
        INSERT INTO leads
        (name, phone, email, interested_in, status, next_follow_up)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
          name,
          phone,
          email,
          interested_in || null,
          status || "New",
          next_follow_up || null,
        ]
      );

      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Create Lead Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to create lead",
      });
    }
  });

  // UPDATE LEAD
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const { name, phone, email, interested_in, status, next_follow_up } =
        req.body;

      const result = await pool.query(
        `
        UPDATE leads
        SET
          name = COALESCE($1, name),
          phone = COALESCE($2, phone),
          email = COALESCE($3, email),
          interested_in = COALESCE($4, interested_in),
          status = COALESCE($5, status),
          next_follow_up = COALESCE($6, next_follow_up)
        WHERE id = $7
        RETURNING *
        `,
        [name, phone, email, interested_in, status, next_follow_up, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Lead not found",
        });
      }

      res.json({
        success: true,
        message: "Lead updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Update Lead Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to update lead",
      });
    }
  });

  // DELETE LEAD
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `
        DELETE FROM leads
        WHERE id = $1
        RETURNING *
        `,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Lead not found",
        });
      }

      res.json({
        success: true,
        message: "Lead deleted successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Delete Lead Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to delete lead",
      });
    }
  });

  return router;
};
