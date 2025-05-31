const db = require("../db");
const crypto = require("crypto");

const CLERK_SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

exports.handleClerkWebhook = async (req, res) => {
  const signature = req.headers["clerk-signature"];
  const rawBody = req.body; // This is a Buffer, not parsed JSON!

  // Verify signature
  const hmac = crypto.createHmac("sha256", CLERK_SIGNING_SECRET);
  hmac.update(rawBody);
  const computedSignature = hmac.digest("hex");

  if (computedSignature !== signature) {
    console.warn("Webhook signature verification failed.");
    return res.status(401).send("Invalid signature");
  }

  // Now parse the JSON body manually since we got raw buffer
  const event = JSON.parse(rawBody.toString());

  console.log("Clerk event received:", event.type);

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
      res.status(200).send("User saved");
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).send("Something went wrong");
    }
  } else {
    res.status(200).send("Ignored");
  }
};
