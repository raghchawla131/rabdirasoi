import express from 'express';
import db from './db';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import cartRoutes from './routes/cart';
import customerDetails from './routes/customerDetails';
import razorpay from './routes/razorpay';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express();

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

app.listen(8000, () => {
  console.log("Server is running on port 8000")
})