import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'bibliotech',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10
});

export async function inicializarBaseDeDatos() {
    try {
        const conexionTemporal = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            port: process.env.DB_PORT || 3306
        });

        await conexionTemporal.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'bibliotech'}\`;`);
        await conexionTemporal.query(`USE \`${process.env.DB_NAME || 'bibliotech'}\`;`);
        
        // Tabla de Usuarios
        await conexionTemporal.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                rol ENUM('admin', 'professor', 'student') DEFAULT 'student'
            );
        `);

        // Tabla de Libros / Materiales (con referencia al archivo subido por Multer)
        await conexionTemporal.query(`
            CREATE TABLE IF NOT EXISTS libros (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(150) NOT NULL,
                autor VARCHAR(100) NOT NULL,
                archivo VARCHAR(255) NOT NULL,
                subido_por INT,
                FOREIGN KEY (subido_por) REFERENCES usuarios(id)
            );
        `);

        await conexionTemporal.end();
        console.log("✅ Base de datos MariaDB y tablas verificadas correctamente.");
    } catch (error) {
        console.error("❌ Error detallado al inicializar la base de datos:", error.message);
    }
}

export default pool;