const Order = require("../models/Order");

exports.monthlySales = async (req, res) => {
  const data = await Order.aggregate([
    { $match: { status: "delivered" } },
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },
        revenue: { $sum: "$total" },
        orders: { $sum: 1 }
      }
    }
  ]);

  res.json(data);
};
