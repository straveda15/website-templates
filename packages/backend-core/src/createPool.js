const { Pool } = require("pg");

// Each generated client backend calls this with its own env (its own
// database, never shared with another client or with the superadmin).
function createPool(env = process.env) {
  const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  });

  pool.on("connect", () => {
    console.log("PostgreSQL connected successfully");
  });

  pool.on("error", (err) => {
    console.error("PostgreSQL connection error:", err);
  });

  return pool;
}

module.exports = { createPool };
