const express = require("express");
const app = express();
app.post(
  "/api/payments/webhook",
  require("express").raw({ type: "application/json" }),
  require("./controllers/webhook.controller").handleStripeWebhook
);
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "E-Commerce Backend API is running",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/analytics", require("./routes/analytics.routes"));
app.use("/api/payments", require("./routes/payment.routes"));


app.use(require("./middlewares/error.middleware"));

module.exports = app;
