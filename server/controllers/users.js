const db = require('../db'); 

exports.getUserRole = (req, res) => {
  const { userId } = req.params;

  const q = 'SELECT role FROM users WHERE user_id = ?';
  db.query(q, [userId], (err, results) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!results.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ role: results[0].role });
  });
}
