const express = require("express");

// `upload` is the multer instance created in createApp.js (kept optional so
// this router still works standalone/in tests without a multer instance).
module.exports = function createProductsRouter(pool, { upload } = {}) {
  const router = express.Router();

  // GET ALL PRODUCTS
  router.get("/", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT id, name, category, price, stock, status, image_url, created_at
        FROM products
        ORDER BY id DESC
      `);

      res.json({
        success: true,
        count: result.rows.length,
        data: result.rows,
      });
    } catch (error) {
      console.error("Get Products Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
      });
    }
  });

  // GET SINGLE PRODUCT
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `
        SELECT id, name, category, price, stock, status, image_url, created_at
        FROM products
        WHERE id = $1
        `,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Get Product Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
      });
    }
  });

  // CREATE PRODUCT
  router.post("/", async (req, res) => {
    try {
      const { name, category, price, stock, status } = req.body;

      if (!name || price === undefined) {
        return res.status(400).json({
          success: false,
          message: "name and price are required",
        });
      }

      const result = await pool.query(
        `
        INSERT INTO products (name, category, price, stock, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [name, category || null, price, stock || 0, status || "Active"]
      );

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Create Product Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to create product",
      });
    }
  });

  // UPDATE PRODUCT
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, price, stock, status } = req.body;

      const result = await pool.query(
        `
        UPDATE products
        SET
          name = COALESCE($1, name),
          category = COALESCE($2, category),
          price = COALESCE($3, price),
          stock = COALESCE($4, stock),
          status = COALESCE($5, status)
        WHERE id = $6
        RETURNING *
        `,
        [name, category, price, stock, status, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        message: "Product updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Update Product Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to update product",
      });
    }
  });

  // UPLOAD PRODUCT IMAGE
  if (upload) {
    router.post("/:id/image", upload.single("image"), async (req, res) => {
      try {
        const { id } = req.params;

        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: "image file is required",
          });
        }

        const imageUrl = `/uploads/${req.file.filename}`;

        const result = await pool.query(
          `UPDATE products SET image_url = $1 WHERE id = $2 RETURNING *`,
          [imageUrl, id]
        );

        if (result.rows.length === 0) {
          return res.status(404).json({
            success: false,
            message: "Product not found",
          });
        }

        res.json({
          success: true,
          message: "Product image uploaded successfully",
          data: result.rows[0],
        });
      } catch (error) {
        console.error("Upload Product Image Error:", error);

        res.status(500).json({
          success: false,
          message: "Failed to upload product image",
        });
      }
    });
  }

  // DELETE PRODUCT
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `DELETE FROM products WHERE id = $1 RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        message: "Product deleted successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Delete Product Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to delete product",
      });
    }
  });

  return router;
};
