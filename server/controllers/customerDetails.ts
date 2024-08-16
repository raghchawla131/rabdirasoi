import { Request, Response } from "express";
import db from "../db";

export const updateCustomerDetails = async (req: Request, res: Response) => {
  const {
    user_id,
    name,
    phone,
    pickup_date,
    pickup_time,
    special_instructions,
  } = req.body;

  if (!user_id || !name || !phone || !pickup_date || !pickup_time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const q = `SELECT * FROM customer_details WHERE user_id = ?`;
  db.query(q, [user_id], (err, result: any[]) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length) {
      const q = `UPDATE customer_details SET name = ?, phone = ?, pickup_date = ?, pickup_time = ?, special_instructions = ? WHERE user_id = ?`;
      db.query(
        q,
        [name, phone, pickup_date, pickup_time, special_instructions, user_id],
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          }
          res.status(200).json({ message: "Customer details updated" });
        }
      );
    } else {
      const q = `INSERT INTO customer_details (user_id, name, phone, pickup_date, pickup_time, special_instructions) VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(
        q,
        [user_id, name, phone, pickup_date, pickup_time, special_instructions],
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          }
          res.status(201).json({ message: "Customer details added" });
        }
      );
    }
  });
};
