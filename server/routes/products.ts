import express from 'express';
import { addProduct, deleteProduct, getProducts, getProductsForHorizontalScroller, getProductUsingId } from '../controllers/products';

const router = express.Router();

router.post('/add-product', addProduct);
router.post('/show-products', getProducts);
router.post('/delete-product/:product_id', deleteProduct);
router.post('/get-product/:product_id', getProductUsingId);
router.post('/get-products-horizontal-scroller', getProductsForHorizontalScroller);

export default router;