const Razorpay = require("razorpay");
const db = require("../db");

exports.order = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Some error occurred" });
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some error occurred" });
  }
};
