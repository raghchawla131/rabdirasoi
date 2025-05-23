const db = require("../db");

exports.addProduct = async (req, res) => {
  const { name, description, category, price, image_url } = req.body;
  console.log(category);

  if (!name || !description || !category || !price || !image_url) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const q =
    "INSERT INTO products (name, description, category, price, image_url) VALUES (?, ?, ?, ?, ?)";
  db.query(q, [name, description, category, price, image_url], (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(201).json({ message: "Product added" });
  });
};

exports.getProducts = async (req, res) => {
  const q = "SELECT * FROM products";

  db.query(q, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(results);
  });
};

exports.deleteProduct = async (req, res) => {
  const { product_id } = req.params;

  try {
    const q = "DELETE FROM products WHERE product_id = ?";
    db.query(q, [product_id], (err, result) => {
      if (err) {
        console.error("Error deleting product:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductUsingId = async (req, res) => {
  const { product_id } = req.params;

  if (product_id === 'keepalive') {
    return res.status(200).json({ message: 'Keep-alive route hit successfully' });
  }

  try {
    const q = "SELECT * FROM products WHERE product_id = ?";
    db.query(q, [product_id], (err, result) => {
      if (err) {
        console.error("Error fetching product:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductsForHorizontalScroller = async (req, res) => {
  const { ids } = req.body;
  
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Product IDs are required" });
  }

  try {
    const q = `SELECT * FROM products WHERE product_id IN (?)`;
    db.query(q, [ids], (err, result) => {
      if (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
