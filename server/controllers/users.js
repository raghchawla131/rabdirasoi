const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Existing function
exports.getUserRole = async (req, res) => {
  const { userId } = req.params;

  try {
    const [results] = await db.query(
      'SELECT role FROM users WHERE user_id = ?',
      [userId]
    );

    if (!results.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ role: results[0].role });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// New sign-up function
exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if email already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username || null, email, password_hash]
    );

    const user = {
      userId: result.insertId,
      username,
      email,
      role: 'user',
    };

    // Generate JWT token
    const token = jwt.sign({ userId: user.userId, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error('SignUp Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// New sign-in function
exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    // Compare password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user_id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      user: {
        userId: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error('SignIn Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
