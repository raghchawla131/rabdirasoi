const mysql2 = require('mysql2/promise'); // use promise API!
require('dotenv').config();

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // max simultaneous connections
  queueLimit: 0,        // no limit on queueing
});

module.exports = pool;
