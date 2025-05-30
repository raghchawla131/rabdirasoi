// routes/orders.js
const express = require('express');
const { createOrder, getLatestOrder, getOrdersByUser } = require('../controllers/orderDetails');


const router = express.Router();

router.post('/create', createOrder); // create new order with customer + item info
router.get('/latest/:userId', getLatestOrder); // optional, for "most recent order"
router.get('/all/:userId', getOrdersByUser); // optional, for full order history

module.exports = router;
