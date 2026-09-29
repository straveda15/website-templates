const express = require("express");

module.exports = function createRefundsRouter(pool) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT id, order_id, amount, reason, status, created_at
        FROM refunds
        ORDER BY id DESC
      `);

      res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (error) {
      console.error("Get Refunds Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch refunds" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT id, order_id, amount, reason, status, created_at FROM refunds WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Refund not found" });
      }

      res.json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error("Get Refund Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch refund" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { order_id, amount, reason, status } = req.body;

      if (!order_id || amount === undefined) {
        return res.status(400).json({ success: false, message: "order_id and amount are required" });
      }

      const result = await pool.query(
        `
        INSERT INTO refunds (order_id, amount, reason, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [order_id, amount, reason || null, status || "Pending"]
      );

      res.status(201).json({ success: true, message: "Refund created successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Create Refund Error:", error);
      res.status(500).json({ success: false, message: "Failed to create refund" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { order_id, amount, reason, status } = req.body;

      const result = await pool.query(
        `
        UPDATE refunds
        SET
          order_id = COALESCE($1, order_id),
          amount = COALESCE($2, amount),
          reason = COALESCE($3, reason),
          status = COALESCE($4, status)
        WHERE id = $5
        RETURNING *
        `,
        [order_id, amount, reason, status, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Refund not found" });
      }

      res.json({ success: true, message: "Refund updated successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Update Refund Error:", error);
      res.status(500).json({ success: false, message: "Failed to update refund" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(`DELETE FROM refunds WHERE id = $1 RETURNING *`, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Refund not found" });
      }

      res.json({ success: true, message: "Refund deleted successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Delete Refund Error:", error);
      res.status(500).json({ success: false, message: "Failed to delete refund" });
    }
  });

  return router;
};
