const express = require("express");

module.exports = function createOrdersRouter(pool) {
  const router = express.Router();

  // GET ALL ORDERS
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
        LEFT JOIN customers c ON o.customer_id = c.id
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

  // GET SINGLE ORDER
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `
        SELECT
          o.id,
          o.customer_id,
          c.name AS customer_name,
          o.amount,
          o.payment_status,
          o.order_status,
          o.created_at
        FROM orders o
        LEFT JOIN customers c ON o.customer_id = c.id
        WHERE o.id = $1
        `,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Get Order Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch order",
      });
    }
  });

  // CREATE ORDER
  router.post("/", async (req, res) => {
    try {
      const { customer_id, amount, payment_status, order_status } = req.body;

      if (!customer_id || amount === undefined) {
        return res.status(400).json({
          success: false,
          message: "customer_id and amount are required",
        });
      }

      const result = await pool.query(
        `
        INSERT INTO orders (customer_id, amount, payment_status, order_status)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
          customer_id,
          amount,
          payment_status || "Pending",
          order_status || "Processing",
        ]
      );

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Create Order Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to create order",
      });
    }
  });

  // UPDATE ORDER
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { customer_id, amount, payment_status, order_status } = req.body;

      const result = await pool.query(
        `
        UPDATE orders
        SET
          customer_id = COALESCE($1, customer_id),
          amount = COALESCE($2, amount),
          payment_status = COALESCE($3, payment_status),
          order_status = COALESCE($4, order_status)
        WHERE id = $5
        RETURNING *
        `,
        [customer_id, amount, payment_status, order_status, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.json({
        success: true,
        message: "Order updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Update Order Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to update order",
      });
    }
  });

  // DELETE ORDER
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `DELETE FROM orders WHERE id = $1 RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.json({
        success: true,
        message: "Order deleted successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Delete Order Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to delete order",
      });
    }
  });

  return router;
};
