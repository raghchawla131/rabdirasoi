const express = require('express');
const { getUserRole } = require('../controllers/users');
const router = express.Router();

router.get('/:userId/role', getUserRole);

module.exports = router;
