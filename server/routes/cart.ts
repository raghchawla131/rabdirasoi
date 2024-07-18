import express from 'express';
import { addToCart, fetchFromCart } from '../controllers/cart';

const router = express.Router();

router.post('/add-to-cart', addToCart);
router.post('/fetch-cart-items', fetchFromCart);

export default router;