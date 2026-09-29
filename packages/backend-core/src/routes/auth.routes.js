const express = require("express");
const bcrypt = require("bcryptjs");
const { signToken, requireAuth } = require("../middleware/auth");

module.exports = function createAuthRouter(pool, env = process.env) {
  const router = express.Router();

  // LOGIN - dashboard users only, one users table per client database.
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "email and password are required",
        });
      }

      const result = await pool.query(
        `SELECT id, email, name, role, password_hash FROM users WHERE email = $1`,
        [email]
      );

      const user = result.rows[0];
      const isValid =
        user && (await bcrypt.compare(password, user.password_hash));

      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = signToken(
        { id: user.id, email: user.email, role: user.role },
        env
      );

      res.json({
        success: true,
        data: {
          token,
          user: { id: user.id, email: user.email, name: user.name, role: user.role },
        },
      });
    } catch (error) {
      console.error("Login Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to log in",
      });
    }
  });

  // ME - resolve the current user from the token.
  router.get("/me", requireAuth(env), async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT id, email, name, role FROM users WHERE id = $1`,
        [req.user.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Me Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch current user",
      });
    }
  });

  return router;
};
