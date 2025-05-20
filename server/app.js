const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const customerDetails = require("./routes/customerDetails");
const razorpay = require("./routes/razorpay");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

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

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/customerDetails", customerDetails);
app.use("/api/payment", razorpay);

app.get("/", (req, res) => {
  res.send("Welcome to the Rab di Rasoi API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
