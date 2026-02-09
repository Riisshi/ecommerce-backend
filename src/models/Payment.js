const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  stripePaymentIntentId: String,
  amount: Number,
  status: String
});

module.exports = mongoose.model("Payment", paymentSchema);
