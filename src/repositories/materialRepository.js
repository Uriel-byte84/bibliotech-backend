const pool = require("../config/db");

const materialRepository = {
  create: async ({ title, description, file_path, uploaded_by }) => {
    const [result] = await pool.query(
      "INSERT INTO materials (title, description, file_path, uploaded_by) VALUES (?, ?, ?, ?)",
      [title, description, file_path, uploaded_by],
    );
    return result.insertId;
  },
  findAll: async () => {
    const [rows] = await pool.query(`
            SELECT m.id, m.title, m.description, m.file_path, m.created_at, u.name AS author
            FROM materials m
            JOIN users u ON m.uploaded_by = u.id
            ORDER BY m.created_at DESC
        `);
    return rows;
  },
};

module.exports = materialRepository;
