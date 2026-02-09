const router = require("express").Router();
const { createPaymentIntent } = require("../controllers/payment.controller");

router.post("/create-intent", createPaymentIntent);

module.exports = router;
