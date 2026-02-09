const router = require("express").Router();
const { placeOrder } = require("../controllers/order.controller");

router.post("/", placeOrder);

module.exports = router;
