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