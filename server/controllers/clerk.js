// controller: clerk.js
const db = require("../db");
const { Webhook } = require("svix");

const CLERK_SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

exports.handleClerkWebhook = async (req, res) => {
  const payload = req.body; // raw Buffer (correct!)
  const headers = req.headers;

  const wh = new Webhook(CLERK_SIGNING_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, headers); // auto throws if signature is invalid
  } catch (err) {
    console.warn("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send("Invalid signature");
  }

  const event = evt; // now verified Clerk event
  console.log("✅ Clerk event verified:", event.type);

  if (event.type === "user.created" || event.type === "user.updated") {
    const user = event.data;

    const email = user.email_addresses?.[0]?.email_address || null;
    const createdAt = new Date(user.created_at);
    const username = user.first_name || null;

    const query = `
      INSERT INTO users (user_id, username, email, created_at)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        username = VALUES(username),
        email = VALUES(email),
        updated_at = CURRENT_TIMESTAMP
    `;

    const values = [user.id, username, email, createdAt];

    try {
      await db.query(query, values);
      res.status(200).send("✅ User saved");
    } catch (err) {
      console.error("❌ Database error:", err);
      res.status(500).send("Something went wrong");
    }
  } else {
    res.status(200).send("Ignored event type");
  }
};
