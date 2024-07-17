import { Request, Response } from "express";
import db from "../db";

export const addProduct = async (req: Request, res: Response) => {
  const {name, description, category, price, image_url} = req.body;
  console.log(category);
  
  if(!name || !description || !category || !price || !image_url) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const q = "INSERT INTO products (name, description, category, price, image_url) VALUES (?, ?, ?, ?, ?)";
  db.query(q, [name, description, category, price, image_url], (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(201).json({ message: "Product added" });
  });
};

export const getProducts = async (req: Request, res: Response) => {
  const q = "SELECT * FROM products";
  
  db.query(q, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(results);
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  
  try {
    const q = 'DELETE FROM products WHERE product_id = ?';
    db.query(q, [product_id], (err, result) => {
      if (err) {
        console.error('Error deleting product:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if((result as any).affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProductUsingId = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  
  try {
    const q = 'SELECT * FROM products WHERE product_id = ?';
    db.query(q, [product_id], (err, result) => {
      if (err) {
        console.error('Error fetching product:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if((result as any).length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}