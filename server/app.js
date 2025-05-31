const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/users");
const clerkRoutes = require("./routes/clerk");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderDetailsRoute = require("./routes/orderDetails");
const razorpay = require("./routes/razorpay");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");  // add this

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: true,
  credentials: true,
};

// Use JSON parser globally, but **exclude webhook route**
app.use((req, res, next) => {
  if (req.originalUrl === "/api/clerk/clerk-webhook") {
    next(); // Skip JSON parser here for raw body parsing later
  } else {
    express.json()(req, res, next);
  }
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Parse raw body for Clerk webhook route ONLY, needed for signature verification
app.use(
  "/api/clerk/clerk-webhook",
  bodyParser.raw({ type: "application/json" })
);

app.use("/api/users", userRoutes);
app.use("/api/clerk", clerkRoutes);
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
