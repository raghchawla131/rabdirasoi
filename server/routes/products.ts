import express from 'express';
import { addProduct, getProducts } from '../controllers/products';

const router = express.Router();

router.post('/add-product', addProduct);
router.post('/show-products', getProducts);

export default router;