const express = require('express');
const { addProduct, getProducts, getProductUsingId, removeProduct, updateProduct } = require('../controllers/products');

const router = express.Router();

router.post('/add', addProduct);
router.get('/get', getProducts);
router.post('/remove/:product_id', removeProduct);
router.post('/get-product/:product_id', getProductUsingId);
router.put('/update/:product_id', updateProduct);


module.exports = router;
