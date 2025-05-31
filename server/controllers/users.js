const db = require('../db'); // your db.js exports a promise-based pool

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
