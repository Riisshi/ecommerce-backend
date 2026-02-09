const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, text: true },
  description: { type: String, text: true },
  price: Number,
  stock: Number,
  category: String,
  images: [String],
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Product", productSchema);
