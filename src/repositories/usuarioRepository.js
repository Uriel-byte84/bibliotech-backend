import pool from '../config/db.js';

export class UsuarioRepository {
    async buscarPorEmail(email) {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    }

    async crear(nombre, email, hashedPassword, rol) {
        const [resultado] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, email, hashedPassword, rol || 'student']
        );
        return resultado.insertId;
    }
}