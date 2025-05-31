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

  const conn = await db.getConnection(); // Get pooled connection

  try {
    await conn.beginTransaction();

    const orderQuery = `
      INSERT INTO orders (user_id, name, phone, pickup_datetime, special_instructions)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [orderResult] = await conn.query(orderQuery, [
      user_id,
      name,
      phone,
      pickup_datetime,
      special_instructions,
    ]);
    const order_id = orderResult.insertId;

    const itemQuery = `
      INSERT INTO order_items (order_id, product_id, pound_quantity, item_quantity)
      VALUES ?
    `;
    const values = orderItems.map((item) => [
      order_id,
      item.product_id,
      item.pound_quantity,
      item.item_quantity,
    ]);
    await conn.query(itemQuery, [values]);

    await conn.commit();
    res.status(201).json({ message: "Order created successfully", order_id });
  } catch (err) {
    await conn.rollback();
    console.error("Order creation failed:", err);
    res.status(500).json({ message: "Error processing order", error: err });
  } finally {
    conn.release();
  }
};

// Get latest order for a user
exports.getLatestOrder = async (req, res) => {
  const userId = req.params.userId;

  const q = `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`;

  try {
    const [result] = await db.query(q, [userId]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error fetching latest order:", err);
    res.status(500).json({ message: "Error fetching latest order" });
  }
};

// Get all orders for a user
exports.getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;

  const q = `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`;

  try {
    const [result] = await db.query(q, [userId]);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ message: "Error fetching orders" });
  }
};
