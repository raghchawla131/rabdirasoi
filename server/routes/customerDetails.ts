import exp from 'constants';
import express from 'express';
import { fetchCustomerDetails, updateCustomerDetails } from '../controllers/customerDetails';

const router = express.Router();

router.post('/fetchCustomerDetails', fetchCustomerDetails);
router.post('/updateCustomerDetails', updateCustomerDetails);

export default router;