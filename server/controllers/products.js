const db = require("../db");

// Add a product
exports.addProduct = async (req, res) => {
  const { name, description, category, price, image_url, tags } = req.body;

  if (!name || !description || !category || !price || !image_url) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  const q = `
    INSERT INTO products (name, description, category, price, image_url, tags)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    await db.query(q, [name, description, category, price, image_url, tags]);
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM products");
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a product by ID
exports.removeProduct = async (req, res) => {
  const productId = Number(req.params.product_id);

  if (!productId) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const q = "DELETE FROM products WHERE product_id = ?";

  try {
    const [result] = await db.query(q, [productId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get product by ID
exports.getProductUsingId = async (req, res) => {
  const productId = req.params.product_id;

  if (productId === "keepalive") {
    return res.status(200).json({ message: "Keep-alive route hit successfully" });
  }

  const q = "SELECT * FROM products WHERE product_id = ?";

  try {
    const [result] = await db.query(q, [productId]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { product_id } = req.params;
  const { name, description, category, price, image_url, tags } = req.body;

  const q = `
    UPDATE products SET name = ?, description = ?, category = ?, price = ?, image_url = ?, tags = ?
    WHERE product_id = ?
  `;

  try {
    const [result] = await db.query(q, [
      name,
      description,
      category,
      price,
      image_url,
      tags,
      product_id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
