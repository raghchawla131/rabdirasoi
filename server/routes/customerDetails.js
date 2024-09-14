const express = require('express');
const { fetchCustomerDetails, updateCustomerDetails } = require('../controllers/customerDetails');

const router = express.Router();

router.post('/fetchCustomerDetails', fetchCustomerDetails);
router.post('/updateCustomerDetails', updateCustomerDetails);

module.exports = router;
