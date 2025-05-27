const express = require('express');
const { adminLogin, login, signup } = require('../controllers/auth');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/admin-login', adminLogin);

module.exports = router;