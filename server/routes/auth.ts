import express from 'express';
import { adminLogin, login, signup } from '../controllers/auth';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/admin-login', adminLogin);

export default router;