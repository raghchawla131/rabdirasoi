import express from 'express';
import { addToCart, fetchFromCart, removeFromCart } from '../controllers/cart';

const router = express.Router();

router.post('/fetch-cart-items', fetchFromCart);
router.post('/add-to-cart', addToCart);
router.post('/remove-from-cart', removeFromCart);

export default router;