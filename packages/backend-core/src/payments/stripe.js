const Stripe = require("stripe");

// Returns null when no key is configured so payments stay fully optional -
// a template that doesn't need checkout just never mounts payments.routes.js.
function createStripeClient(env = process.env) {
  if (!env.STRIPE_SECRET_KEY) return null;
  return new Stripe(env.STRIPE_SECRET_KEY);
}

module.exports = { createStripeClient };
