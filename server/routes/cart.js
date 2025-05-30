const express = require('express');
const { addToCart, fetchFromCart, removeFromCart, updateCartItem } = require('../controllers/cart');

const router = express.Router();

router.get('/get', fetchFromCart);
router.post('/add', addToCart);
router.delete('/remove', removeFromCart);
router.put('/update', updateCartItem);

module.exports = router;
