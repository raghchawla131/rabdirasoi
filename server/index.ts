import express from 'express';
import db from './db';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import cartRoutes from './routes/cart';


const app = express();

app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000")
})