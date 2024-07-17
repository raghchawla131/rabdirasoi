import { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../db";
import jwt from "jsonwebtoken";

export const signup = (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  const q = `SELECT * FROM users WHERE email = ?`;

  db.query(q, [email], (err, result: any[]) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length) {
      return res.status(400).json({ message: "User already exists" });
    }

    //password hashing using bcrypt
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";
    db.query(q, [email, hash, username], (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(201).json({ message: "User created" });
    });
  });
};

export const login = (req: Request, res: Response) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, result: any[]) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!result.length) {
      return res.status(400).json({ message: "User does not exist" });
    }

    //password verification using bcrypt
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      result[0].password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //jwt authentication and storing access token in cookie using npm cookie-parser
    const token = jwt.sign({ id: result[0].id }, "secretKey");    
    const { user_id } = result[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user_id);
  });
};

export const adminLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Query the admins table
  const query = `SELECT * FROM admins WHERE email = ?`;

  // Check if email exists in the admins table
  db.query(query, [email], (err, result: any[]) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!result.length) {
      return res.status(400).json({ message: "Admin does not exist" });
    }

    // Password verification (plain text comparison)
    if (password !== result[0].password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If the email and password match, return success response
    res.status(200).json({ message: "Login successful" });
  });
};
