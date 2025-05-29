const db = require('../db');
exports.handleClerkWebhook = (req, res) => {
  const event = req.body;

  console.log('Clerk event received:', event.type);

  if (event.type === 'user.created' || event.type === 'user.updated') {
    const user = event.data;

    const email = user.email_addresses[0]?.email_address || null;
    const createdAt = new Date(user.created_at);
    const username = user.first_name || null;  // null if no first_name

    const query = `
      INSERT INTO users (user_id, username, email, created_at)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        username = VALUES(username),
        email = VALUES(email),
        updated_at = CURRENT_TIMESTAMP
    `;

    const values = [user.id, username, email, createdAt];

    db.query(query, values, (err) => {
      if (err) {
        console.log('Database error:', err);
        return res.status(500).send('Something went wrong');
      }
      res.status(200).send('User saved');
    });
  } else {
    res.status(200).send('Ignored');
  }
};
