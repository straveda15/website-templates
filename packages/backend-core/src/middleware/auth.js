const jwt = require("jsonwebtoken");

function signToken(payload, env = process.env) {
  const secret = env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

// Express middleware: requires a valid "Authorization: Bearer <token>" header.
function requireAuth(env = process.env) {
  return function (req, res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing or invalid Authorization header",
      });
    }

    try {
      req.user = jwt.verify(token, env.JWT_SECRET);
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
}

module.exports = { signToken, requireAuth };
