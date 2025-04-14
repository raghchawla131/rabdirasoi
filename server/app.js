const express = require('express');
const db = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const customerDetails = require('./routes/customerDetails');
const razorpay = require('./routes/razorpay');
const keepAlive = require('./routes/keepAlive');
const path = require('path');
const dotenv = require('dotenv');
const cron = require('node-cron');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/customerDetails', customerDetails);
app.use('/api/payment', razorpay);
app.use('/api/keep-alive', keepAlive);

// Cron job to send a "keep-alive" request every 14 minutes
cron.schedule('*/14 * * * *', () => {
  console.log('Sending keep-alive request');
  axios.get(`http://localhost:${PORT}/api/keep-alive`) // Ensure you have this route
    .then(response => console.log('Server is alive!'))
    .catch(err => console.error('Error with keep-alive request:', err));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
