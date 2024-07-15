import express from 'express';
import db from './db';
import cors from 'cors';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000")
})