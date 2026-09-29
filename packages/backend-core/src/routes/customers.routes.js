const express = require("express");

module.exports = function createCustomersRouter(pool) {
  const router = express.Router();

  // GET ALL CUSTOMERS
  router.get("/", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT id, name, phone, email, address, created_at
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

  // GET SINGLE CUSTOMER
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `
        SELECT id, name, phone, email, address, created_at
        FROM customers
        WHERE id = $1
        `,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Get Customer Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch customer",
      });
    }
  });

  // CREATE CUSTOMER
  router.post("/", async (req, res) => {
    try {
      const { name, phone, email, address } = req.body;

      if (!name || !phone || !email) {
        return res.status(400).json({
          success: false,
          message: "Name, phone and email are required",
        });
      }

      const result = await pool.query(
        `
        INSERT INTO customers (name, phone, email, address)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [name, phone, email, address || null]
      );

      res.status(201).json({
        success: true,
        message: "Customer created successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Create Customer Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to create customer",
      });
    }
  });

  // UPDATE CUSTOMER
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone, email, address } = req.body;

      const result = await pool.query(
        `
        UPDATE customers
        SET
          name = COALESCE($1, name),
          phone = COALESCE($2, phone),
          email = COALESCE($3, email),
          address = COALESCE($4, address)
        WHERE id = $5
        RETURNING *
        `,
        [name, phone, email, address, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      res.json({
        success: true,
        message: "Customer updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Update Customer Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to update customer",
      });
    }
  });

  // DELETE CUSTOMER
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `DELETE FROM customers WHERE id = $1 RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      res.json({
        success: true,
        message: "Customer deleted successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Delete Customer Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to delete customer",
      });
    }
  });

  return router;
};
