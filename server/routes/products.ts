import express from 'express';
import { addProduct, deleteProduct, getProducts, getProductUsingId } from '../controllers/products';

const router = express.Router();

router.post('/add-product', addProduct);
router.post('/show-products', getProducts);
router.post('/delete-product/:product_id', deleteProduct);
router.post('/get-product/:product_id', getProductUsingId);

export default router;