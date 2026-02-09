const stripe = require("../config/stripe");
const Payment = require("../models/Payment");
const Order = require("../models/Order");

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;

    const payment = await Payment.findOne({
      stripePaymentIntentId: intent.id
    });

    if (payment) {
      payment.status = "paid";
      await payment.save();

      await Order.findByIdAndUpdate(payment.order, {
        paymentStatus: "paid",
        status: "processing"
      });
    }
  }

  res.json({ received: true });
};
