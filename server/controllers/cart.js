const db = require("../db");

exports.fetchFromCart = async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const selectQuery = `
    SELECT products.product_id, products.name, products.description, products.category, products.price, products.image_url,
           cart.pound_quantity, cart.item_quantity
    FROM products
    INNER JOIN cart ON products.product_id = cart.product_id
    WHERE cart.user_id = ?
  `;
  db.query(selectQuery, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch cart items." });
    }
    return res.status(200).json(results);
  });
};

exports.addToCart = async (req, res) => {
  const { user_id, product_id, pound_quantity, item_quantity } = req.body;

  if (!user_id || !product_id || pound_quantity === undefined || item_quantity === undefined) {
    return res.status(400).json({ error: "All fields (user_id, product_id, pound_quantity, item_quantity) are required." });
  }

  const checkQuery = `SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND pound_quantity = ?`;
  db.query(checkQuery, [user_id, product_id, pound_quantity], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error while checking existing cart item." });
    }

    if (Array.isArray(results) && results.length > 0) {
      return res.status(409).json({ error: "This product with the specified pound quantity is already in your cart." });
    }

    const insertQuery = `
      INSERT INTO cart (user_id, product_id, pound_quantity, item_quantity)
      VALUES (?, ?, ?, ?)
    `;
    db.query(insertQuery, [user_id, product_id, pound_quantity, item_quantity], (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to add product to cart." });
      }
      return res.status(201).json({ message: "Product successfully added to cart." });
    });
  });
};

exports.removeFromCart = async (req, res) => {
  const { user_id, product_id, pound_quantity } = req.body;
  if (!user_id || !product_id || pound_quantity === undefined) {
    return res.status(400).json({ error: "User ID, product ID and pound quantity are required to remove an item." });
  }

  const deleteQuery = `
    DELETE FROM cart
    WHERE user_id = ? AND product_id = ? AND pound_quantity = ?
  `;
  db.query(deleteQuery, [user_id, product_id, pound_quantity], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to remove product from cart." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cart item not found." });
    }
    return res.status(200).json({ message: "Product removed from cart." });
  });
};

// Unified update method for both item_quantity and pound_quantity
exports.updateCartItem = async (req, res) => {
  const { user_id, product_id, old_pound_quantity, new_pound_quantity, item_quantity } = req.body;

  if (!user_id || !product_id || old_pound_quantity === undefined || new_pound_quantity === undefined || item_quantity === undefined) {
    return res.status(400).json({ error: "user_id, product_id, old_pound_quantity, new_pound_quantity, and item_quantity are all required." });
  }

  // First, check if the new pound_quantity for this user/product already exists to avoid duplicates
  const checkNewQuery = `SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND pound_quantity = ?`;
  db.query(checkNewQuery, [user_id, product_id, new_pound_quantity], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error during update check." });
    }

    // If there is an existing row with the new pound_quantity (different from the old one), reject update to prevent duplicates
    if (Array.isArray(results) && results.length > 0 && new_pound_quantity !== old_pound_quantity) {
      return res.status(409).json({ error: "Another cart item already exists with the new pound quantity." });
    }

    const updateQuery = `
      UPDATE cart
      SET pound_quantity = ?, item_quantity = ?, updated_at = NOW()
      WHERE user_id = ? AND product_id = ? AND pound_quantity = ?
    `;
    db.query(updateQuery, [new_pound_quantity, item_quantity, user_id, product_id, old_pound_quantity], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to update cart item." });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Cart item to update not found." });
      }
      return res.status(200).json({ message: "Cart item successfully updated." });
    });
  });
};
