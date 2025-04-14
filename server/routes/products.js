const express = require('express');
const { addProduct, deleteProduct, getProducts, getProductsForHorizontalScroller, getProductUsingId } = require('../controllers/products');

const router = express.Router();

router.post('/add-product', addProduct);
router.post('/show-products', getProducts);
router.post('/delete-product/:product_id', deleteProduct);

// In your routes/products.js
router.post('/get-product/keepalive', (req, res) => {
  // Logic for keep-alive, just returning a simple response
  res.status(200).json({ message: 'Keep-alive route hit successfully' });
});

router.post('/get-product/:product_id', getProductUsingId);

router.post('/get-products-horizontal-scroller', getProductsForHorizontalScroller);

module.exports = router;
