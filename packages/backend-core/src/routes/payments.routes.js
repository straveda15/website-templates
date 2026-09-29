const express = require("express");
const { createStripeClient } = require("../payments/stripe");

// Minimal checkout + webhook stub. The webhook handler expects to be
// mounted with express.raw({ type: "application/json" }) (see createApp.js)
// so Stripe's signature can be verified against the exact request body.
module.exports = function createPaymentsRouter(pool, env = process.env) {
  const router = express.Router();
  const stripe = createStripeClient(env);

  // LIST PAYMENT RECORDS
  router.get("/", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT id, order_id, amount, method, status, provider_ref, created_at
        FROM payments
        ORDER BY id DESC
      `);

      res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (error) {
      console.error("Get Payments Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch payments" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT id, order_id, amount, method, status, provider_ref, created_at FROM payments WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Payment not found" });
      }

      res.json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error("Get Payment Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch payment" });
    }
  });

  // RECORD A PAYMENT (manual entry - cash/UPI/bank transfer, or logged by the webhook below)
  router.post("/", async (req, res) => {
    try {
      const { order_id, amount, method, status, provider_ref } = req.body;

      if (!order_id || amount === undefined) {
        return res.status(400).json({ success: false, message: "order_id and amount are required" });
      }

      const result = await pool.query(
        `
        INSERT INTO payments (order_id, amount, method, status, provider_ref)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [order_id, amount, method || "Card", status || "Pending", provider_ref || null]
      );

      res.status(201).json({ success: true, message: "Payment recorded successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Create Payment Error:", error);
      res.status(500).json({ success: false, message: "Failed to record payment" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { order_id, amount, method, status, provider_ref } = req.body;

      const result = await pool.query(
        `
        UPDATE payments
        SET
          order_id = COALESCE($1, order_id),
          amount = COALESCE($2, amount),
          method = COALESCE($3, method),
          status = COALESCE($4, status),
          provider_ref = COALESCE($5, provider_ref)
        WHERE id = $6
        RETURNING *
        `,
        [order_id, amount, method, status, provider_ref, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Payment not found" });
      }

      res.json({ success: true, message: "Payment updated successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Update Payment Error:", error);
      res.status(500).json({ success: false, message: "Failed to update payment" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(`DELETE FROM payments WHERE id = $1 RETURNING *`, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Payment not found" });
      }

      res.json({ success: true, message: "Payment deleted successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Delete Payment Error:", error);
      res.status(500).json({ success: false, message: "Failed to delete payment" });
    }
  });

  router.post("/checkout-session", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({
        success: false,
        message: "Payments are not configured for this client",
      });
    }

    try {
      const { order_id } = req.body;

      const orderResult = await pool.query(
        `SELECT id, amount FROM orders WHERE id = $1`,
        [order_id]
      );
      const order = orderResult.rows[0];

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "inr",
              unit_amount: Math.round(Number(order.amount) * 100),
              product_data: { name: `Order #${order.id}` },
            },
            quantity: 1,
          },
        ],
        success_url: env.STRIPE_SUCCESS_URL || "http://localhost:3000/checkout/success",
        cancel_url: env.STRIPE_CANCEL_URL || "http://localhost:3000/checkout/cancel",
        metadata: { order_id: String(order.id) },
      });

      res.json({ success: true, data: { url: session.url } });
    } catch (error) {
      console.error("Create Checkout Session Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to create checkout session",
      });
    }
  });

  router.post("/webhook", async (req, res) => {
    if (!stripe) return res.status(503).end();

    let event;
    try {
      event = env.STRIPE_WEBHOOK_SECRET
        ? stripe.webhooks.constructEvent(
            req.body,
            req.headers["stripe-signature"],
            env.STRIPE_WEBHOOK_SECRET
          )
        : JSON.parse(req.body);
    } catch (error) {
      console.error("Webhook Signature Error:", error);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata?.order_id;
      if (orderId) {
        await pool.query(`UPDATE orders SET payment_status = 'Paid' WHERE id = $1`, [orderId]);
        await pool.query(
          `INSERT INTO payments (order_id, amount, method, status, provider_ref) VALUES ($1, $2, $3, $4, $5)`,
          [orderId, (session.amount_total || 0) / 100, "Card", "Success", session.id]
        );
      }
    }

    res.json({ received: true });
  });

  return router;
};
