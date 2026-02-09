const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items, userId } = req.body;

    let total = 0;

    for (let item of items) {
      const product = await Product.findById(item.product).session(session);
      if (product.stock < item.quantity) throw new Error("Out of stock");

      product.stock -= item.quantity;
      await product.save();
      total += product.price * item.quantity;
    }

    const order = await Order.create([{
      user: userId,
      items,
      total,
      orderNumber: Date.now().toString()
    }], { session });

    await session.commitTransaction();
    res.status(201).json(order[0]);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};
