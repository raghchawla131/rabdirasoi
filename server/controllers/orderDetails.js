// controllers/orders.js
const db = require("../db");

// Create a new order with customer and order items
exports.createOrder = async (req, res) => {
  const {
    user_id,
    name,
    phone,
    pickup_datetime,
    special_instructions,
    orderItems,
  } = req.body;

  if (!user_id || !name || !phone || !pickup_datetime || !Array.isArray(orderItems)) {
    return res.status(400).json({ message: "Missing required fields or items" });
  }

  const orderQuery = `INSERT INTO orders (user_id, name, phone, pickup_datetime, special_instructions) VALUES (?, ?, ?, ?, ?)`;

  db.query(orderQuery, [user_id, name, phone, pickup_datetime, special_instructions], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error creating order", error: err });
    }

    const order_id = result.insertId;

    const itemQuery = `INSERT INTO order_items (order_id, product_id, pound_quantity, item_quantity) VALUES ?`;
    const values = orderItems.map((item) => [
      order_id,
      item.product_id,
      item.pound_quantity,
      item.item_quantity,
    ]);

    db.query(itemQuery, [values], (err) => {
      if (err) {
        return res.status(500).json({ message: "Error adding order items", error: err });
      }
      res.status(201).json({ message: "Order created successfully", order_id });
    });
  });
};

// Get latest order for a user
exports.getLatestOrder = async (req, res) => {
  const userId = req.params.userId;
  const q = `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`;
  db.query(q, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching latest order" });
    }
    if (!result.length) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(result[0]);
  });
};

// Get all orders for a user
exports.getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;
  const q = `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`;
  db.query(q, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching orders" });
    }
    res.status(200).json(result);
  });
};
