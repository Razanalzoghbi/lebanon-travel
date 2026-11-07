require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

async function main() {
  const [name, email, password] = process.argv.slice(2);
  if (!name || !email || !password) {
    console.log('Usage: node createAdmin.js "Name" email password');
    process.exit(1);
  }
  if (password.length < 6) {
    console.log("Password must be at least 6 characters");
    process.exit(1);
  }

  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const hash = await bcrypt.hash(password, 10);
  await db.query(
    `INSERT INTO users (name, email, password_hash, role, status)
     VALUES (?, ?, ?, 'admin', 'active')
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), role = 'admin', status = 'active'`,
    [name, email.toLowerCase().trim(), hash]
  );
  console.log("Admin ready:", email);
  await db.end();
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});