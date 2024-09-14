const express = require('express');
const { addToCart, fetchFromCart, removeFromCart, updateCartItemQuantity, updateCartPoundQuantity } = require('../controllers/cart');

const router = express.Router();

router.post('/fetch-cart-items', fetchFromCart);
router.post('/add-to-cart', addToCart);
router.post('/remove-from-cart', removeFromCart);
router.post('/update-cart-item-quantity', updateCartItemQuantity);
router.post('/update-cart-item-pound-quantity', updateCartPoundQuantity);

module.exports = router;
