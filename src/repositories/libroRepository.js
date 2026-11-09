import pool from '../config/db.js';

export class LibroRepository {
    async crear(titulo, autor, archivo, userId) {
        const [resultado] = await pool.query(
            'INSERT INTO libros (titulo, autor, archivo, subido_por) VALUES (?, ?, ?, ?)',
            [titulo, autor, archivo, userId]
        );
        return resultado.insertId;
    }

    async obtenerTodos() {
        const [rows] = await pool.query('SELECT libros.*, usuarios.nombre as profesor FROM libros JOIN usuarios ON libros.subido_por = usuarios.id');
        return rows;
    }
}