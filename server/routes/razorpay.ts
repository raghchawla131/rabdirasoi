import express from 'express';
import { order } from '../controllers/razorpay';

const router = express.Router();

router.post('/order', order);

export default router;