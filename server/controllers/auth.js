const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { Request, Response } = require("express");

exports.signup = (req, res) => {
  const { email, password, username } = req.body;
  const q = `SELECT * FROM users WHERE email = ?`;

  db.query(q, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length) {
      return res.status(400).json({ message: "User already exists" });
    }

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

exports.login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!result.length) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, result[0].password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

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

exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM admins WHERE email = ?`;

  db.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!result.length) {
      return res.status(400).json({ message: "Admin does not exist" });
    }

    if (password !== result[0].password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  });
};
