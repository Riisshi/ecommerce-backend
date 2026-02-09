const stripe = require("../config/stripe");
const Payment = require("../models/Payment");
const Order = require("../models/Order");

exports.createPaymentIntent = async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.total * 100), // Stripe uses paise
    currency: "inr",
    metadata: { orderId: order._id.toString() }
  });

  await Payment.create({
    order: order._id,
    stripePaymentIntentId: paymentIntent.id,
    amount: order.total,
    status: "pending"
  });

  res.json({
    clientSecret: paymentIntent.client_secret
  });
};
