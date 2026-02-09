const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });
  res.status(201).json({ id: user._id, email: user.email });
};
