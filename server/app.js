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

// Cron job to hit a real product endpoint every 14 minutes
cron.schedule('*/14 * * * *', () => {
  console.log('⏰ Sending keep-alive DB-touch request');
  axios.post(`https://rabdirasoi.onrender.com/api/products/get-product/keepalive`) // Replace with a real product ID from your DB
    .then(res => console.log('✅ Keep-alive successful:', res.status))
    .catch(err => console.error('❌ Keep-alive failed:', err.message));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
