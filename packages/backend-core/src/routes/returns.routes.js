const express = require("express");

module.exports = function createReturnsRouter(pool) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT id, order_id, reason, status, created_at
        FROM returns
        ORDER BY id DESC
      `);

      res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (error) {
      console.error("Get Returns Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch returns" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT id, order_id, reason, status, created_at FROM returns WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Return not found" });
      }

      res.json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error("Get Return Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch return" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { order_id, reason, status } = req.body;

      if (!order_id) {
        return res.status(400).json({ success: false, message: "order_id is required" });
      }

      const result = await pool.query(
        `
        INSERT INTO returns (order_id, reason, status)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [order_id, reason || null, status || "Requested"]
      );

      res.status(201).json({ success: true, message: "Return created successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Create Return Error:", error);
      res.status(500).json({ success: false, message: "Failed to create return" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { order_id, reason, status } = req.body;

      const result = await pool.query(
        `
        UPDATE returns
        SET
          order_id = COALESCE($1, order_id),
          reason = COALESCE($2, reason),
          status = COALESCE($3, status)
        WHERE id = $4
        RETURNING *
        `,
        [order_id, reason, status, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Return not found" });
      }

      res.json({ success: true, message: "Return updated successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Update Return Error:", error);
      res.status(500).json({ success: false, message: "Failed to update return" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(`DELETE FROM returns WHERE id = $1 RETURNING *`, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Return not found" });
      }

      res.json({ success: true, message: "Return deleted successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Delete Return Error:", error);
      res.status(500).json({ success: false, message: "Failed to delete return" });
    }
  });

  return router;
};
