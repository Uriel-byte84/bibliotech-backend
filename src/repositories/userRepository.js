const pool = require("../config/db");

const userRepository = {
  findByEmail: async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },
  create: async (userData) => {
    const { name, email, password, role } = userData;
    const userRole = role || "Student";
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, userRole],
    );
    return result.insertId;
  },
};

module.exports = userRepository;
