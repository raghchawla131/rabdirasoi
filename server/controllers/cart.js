const db = require("../db");

exports.fetchFromCart = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const selectQuery = `
      SELECT products.product_id, products.name, products.description, products.category, products.price, products.image_url, cart.pound_quantity, cart.item_quantity
      FROM products
      INNER JOIN cart
      ON products.product_id = cart.product_id
      WHERE cart.user_id = ?
    `;
  db.query(selectQuery, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json(results);
  });
};

exports.addToCart = async (req, res) => {
  const { user_id, product_id, pound_quantity, item_quantity } = req.body;

  if (!user_id || !product_id || !pound_quantity || !item_quantity) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const checkQuery = `SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND pound_quantity = ?`;
  db.query(checkQuery, [user_id, product_id, pound_quantity], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (Array.isArray(results) && results.length > 0) {
      return res.status(409).json({ error: "Product already in cart with the same pound quantity" });
    }

    const insertQuery = `
      INSERT INTO cart (user_id, product_id, pound_quantity, item_quantity)
      VALUES (?, ?, ?, ?)
    `;
    db.query(insertQuery, [user_id, product_id, pound_quantity, item_quantity], (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      return res.status(201).json({ message: "Product added to cart" });
    });
  });
};

exports.removeFromCart = async (req, res) => {
  const { user_id, product_id, pound_quantity } = req.body;
  if (!user_id || !product_id) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const deleteQuery = `
      DELETE FROM cart
      WHERE user_id = ? AND product_id = ? AND pound_quantity = ?
    `;
  db.query(deleteQuery, [user_id, product_id, pound_quantity], (err) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ message: "Product removed from cart" });
  });
};

exports.updateCartItemQuantity = async (req, res) => {
  const { user_id, product_id, pound_quantity, item_quantity } = req.body;

  if (!user_id || !product_id || !pound_quantity || !item_quantity) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const updateQuery = `UPDATE cart SET item_quantity = ? WHERE user_id = ? AND product_id = ? AND pound_quantity = ?`;
  db.query(updateQuery, [item_quantity, user_id, product_id, pound_quantity], (err) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ message: "Cart item quantity updated" });
  });
};

exports.updateCartPoundQuantity = async (req, res) => {
  const { user_id, product_id, old_pound_quantity, new_pound_quantity } = req.body;

  if (!user_id || !product_id || old_pound_quantity === undefined || new_pound_quantity === undefined) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const checkNewQuery = `SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND pound_quantity = ?`;
  
  db.query(checkNewQuery, [user_id, product_id, new_pound_quantity], (err, results) => {
    if (err) {
      if (!res.headersSent) {
        return res.status(500).json({ error: "Internal server error" });
      }
      return;
    }

    if (Array.isArray(results) && results.length > 0) {
      if (!res.headersSent) {
        return res.status(409).json({ error: "Product already in cart with the same pound quantity" });
      }
      return;
    }

    const updateQuery = `UPDATE cart SET pound_quantity = ? WHERE user_id = ? AND product_id = ? AND pound_quantity = ?`;
    db.query(updateQuery, [new_pound_quantity, user_id, product_id, old_pound_quantity], (err) => {
      if (err) {
        if (!res.headersSent) {
          return res.status(500).json({ error: "Internal server error" });
        }
        return;
      }

      if (!res.headersSent) {
        return res.status(200).json({ message: "Cart item pound quantity updated" });
      }
    });
  });
};
