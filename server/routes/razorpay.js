const express = require('express');
const { order } = require('../controllers/razorpay');

const router = express.Router();

router.post('/order', order);

module.exports = router;
