const Razorpay = require("razorpay");
const crypto = require("crypto");

require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const order = await razorpay.orders.create({ amount, currency, receipt });
    res.status(200).json(order);
  } catch (err) {
    console.error("Order creation failed", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hash = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (hash === razorpay_signature) {
    res.status(200).json({ verified: true });
  } else {
    res.status(400).json({ verified: false });
  }
};
