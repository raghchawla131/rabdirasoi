import exp from 'constants';
import express from 'express';
import { updateCustomerDetails } from '../controllers/customerDetails';

const router = express.Router();

router.post('/updateCustomerDetails', updateCustomerDetails);

export default router;