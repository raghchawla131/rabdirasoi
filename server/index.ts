import express from 'express';
import db from './db';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';


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

app.listen(8001, () => {
  console.log("Server is running on port 8001")
})