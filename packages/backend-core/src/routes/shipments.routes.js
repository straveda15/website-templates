const express = require("express");

module.exports = function createShipmentsRouter(pool) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT id, order_id, carrier, tracking_number, status, shipped_at, delivered_at, created_at
        FROM shipments
        ORDER BY id DESC
      `);

      res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (error) {
      console.error("Get Shipments Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch shipments" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT id, order_id, carrier, tracking_number, status, shipped_at, delivered_at, created_at
         FROM shipments WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Shipment not found" });
      }

      res.json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error("Get Shipment Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch shipment" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { order_id, carrier, tracking_number, status, shipped_at, delivered_at } = req.body;

      if (!order_id) {
        return res.status(400).json({ success: false, message: "order_id is required" });
      }

      const result = await pool.query(
        `
        INSERT INTO shipments (order_id, carrier, tracking_number, status, shipped_at, delivered_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
          order_id,
          carrier || null,
          tracking_number || null,
          status || "Processing",
          shipped_at || null,
          delivered_at || null,
        ]
      );

      res.status(201).json({ success: true, message: "Shipment created successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Create Shipment Error:", error);
      res.status(500).json({ success: false, message: "Failed to create shipment" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { order_id, carrier, tracking_number, status, shipped_at, delivered_at } = req.body;

      const result = await pool.query(
        `
        UPDATE shipments
        SET
          order_id = COALESCE($1, order_id),
          carrier = COALESCE($2, carrier),
          tracking_number = COALESCE($3, tracking_number),
          status = COALESCE($4, status),
          shipped_at = COALESCE($5, shipped_at),
          delivered_at = COALESCE($6, delivered_at)
        WHERE id = $7
        RETURNING *
        `,
        [order_id, carrier, tracking_number, status, shipped_at, delivered_at, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Shipment not found" });
      }

      res.json({ success: true, message: "Shipment updated successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Update Shipment Error:", error);
      res.status(500).json({ success: false, message: "Failed to update shipment" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(`DELETE FROM shipments WHERE id = $1 RETURNING *`, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Shipment not found" });
      }

      res.json({ success: true, message: "Shipment deleted successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Delete Shipment Error:", error);
      res.status(500).json({ success: false, message: "Failed to delete shipment" });
    }
  });

  return router;
};
