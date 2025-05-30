const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/razorpay");

const router = express.Router();

require('dotenv').config();

router.post("/create-order", createOrder);   // More descriptive name
router.post("/verify", verifyPayment);       // For signature verification

module.exports = router;
