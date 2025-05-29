const express = require('express');
const { handleClerkWebhook } = require('../controllers/clerk');

const router = express.Router();

router.post('/clerk-webhook', handleClerkWebhook);

module.exports = router;