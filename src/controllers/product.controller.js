const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

exports.createProduct = async (req, res) => {
  let imageUrls = [];

  if (req.files) {
    for (let file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
    }
  }

  const product = await Product.create({
    ...req.body,
    images: imageUrls
  });

  res.status(201).json(product);
};

exports.searchProducts = async (req, res) => {
  const { q, cursor } = req.query;

  const query = q
    ? { $text: { $search: q } }
    : {};

  if (cursor) {
    query._id = { $gt: cursor };
  }

  const products = await Product.find(query)
    .limit(10)
    .sort({ _id: 1 });

  const nextCursor =
    products.length > 0 ? products[products.length - 1]._id : null;

  res.json({ data: products, nextCursor });
};
