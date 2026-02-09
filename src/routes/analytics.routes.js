const router = require("express").Router();
const { monthlySales } = require("../controllers/analytics.controller");

router.get("/sales", monthlySales);

module.exports = router;
