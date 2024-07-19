import { Request, Response } from "express";
import db from "../db";

export const fetchFromCart = async (req: Request, res: Response) => {
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

export const addToCart = async (req: Request, res: Response) => {
  const { user_id, product_id, pound_quantity, item_quantity } = req.body;
  if (!user_id || !product_id || !pound_quantity || !item_quantity) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const checkQuery = `SELECT * FROM cart WHERE user_id = ? AND product_id = ?`;
  db.query(checkQuery, [user_id, product_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (Array.isArray(results) && results.length > 0) {
      return res.status(409).json({ error: "Product already in cart" });
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


export const removeFromCart = async (req: Request, res: Response) => {
  const { user_id, product_id } = req.body;  
  if (!user_id || !product_id) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  const deleteQuery = `
      DELETE FROM cart
      WHERE user_id = ? AND product_id = ?
    `;
  db.query(deleteQuery, [user_id, product_id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ message: "Product removed from cart" });
  });
}