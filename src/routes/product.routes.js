const router = require("express").Router();
const multer = require("multer");
const {
  createProduct,
  searchProducts
} = require("../controllers/product.controller");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("images"), createProduct);
router.get("/search", searchProducts);

module.exports = router;
