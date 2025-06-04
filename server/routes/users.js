const express = require('express');
const { getUserRole, signUp, signIn } = require('../controllers/users');
const router = express.Router();

router.get('/:userId/role', getUserRole);
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
