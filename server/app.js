const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderDetailsRoute = require("./routes/orderDetails");
const razorpay = require("./routes/razorpay");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: true,
  credentials: true,
};

// Use JSON parser globally
app.use(express.json());

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderDetailsRoute);
app.use("/api/payment", razorpay);

app.get("/", (req, res) => {
  res.send("Welcome to the Rab di Rasoi API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
