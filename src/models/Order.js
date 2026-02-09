const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: { type: String, default: "pending" },
  paymentStatus: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
