const express = require("express");

// Read-only aggregates over data the other modules already own - no new table.
module.exports = function createAnalyticsRouter(pool) {
  const router = express.Router();

  router.get("/summary", async (req, res) => {
    try {
      const [
        leadsCount,
        customersCount,
        ordersAgg,
        lowStock,
        leadsByStatus,
        ordersByStatus,
      ] = await Promise.all([
        pool.query(`SELECT COUNT(*)::int AS count FROM leads`),
        pool.query(`SELECT COUNT(*)::int AS count FROM customers`),
        pool.query(
          `SELECT COUNT(*)::int AS count, COALESCE(SUM(amount), 0)::float AS revenue FROM orders`
        ),
        pool.query(`SELECT COUNT(*)::int AS count FROM products WHERE stock < 5`),
        pool.query(
          `SELECT status, COUNT(*)::int AS count FROM leads GROUP BY status ORDER BY count DESC`
        ),
        pool.query(
          `SELECT order_status AS status, COUNT(*)::int AS count FROM orders GROUP BY order_status ORDER BY count DESC`
        ),
      ]);

      res.json({
        success: true,
        data: {
          totalLeads: leadsCount.rows[0].count,
          totalCustomers: customersCount.rows[0].count,
          totalOrders: ordersAgg.rows[0].count,
          totalRevenue: ordersAgg.rows[0].revenue,
          lowStockProducts: lowStock.rows[0].count,
          leadsByStatus: leadsByStatus.rows,
          ordersByStatus: ordersByStatus.rows,
        },
      });
    } catch (error) {
      console.error("Analytics Summary Error:", error);
      res.status(500).json({ success: false, message: "Failed to load analytics" });
    }
  });

  return router;
};
