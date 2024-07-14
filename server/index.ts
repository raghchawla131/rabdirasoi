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

app.get("/api/auth/signup", (req, res) => {
  res.send("<h1>signup page</h1>")
})

app.get("/api/auth/login", (req, res) => {
  res.send("<h1>login page</h1>")
})

app.use('/api/auth', authRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000")
})