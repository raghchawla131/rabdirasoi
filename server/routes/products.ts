import express from 'express';
import { addProduct, deleteProduct, getProducts } from '../controllers/products';

const router = express.Router();

router.post('/add-product', addProduct);
router.post('/show-products', getProducts);
router.post('/delete-product/:product_id', deleteProduct);

export default router;