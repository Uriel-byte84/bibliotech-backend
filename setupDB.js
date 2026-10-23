const mysql = require("mysql2/promise");

async function setup() {
    try {
        // Conectamos a MariaDB SIN especificar la base de datos (porque aún no existe)
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: ""
        });

        console.log("Conectado al motor MariaDB. Creando todo...");

        await connection.query("CREATE DATABASE IF NOT EXISTS bibliotech;");
        await connection.query("USE bibliotech;");

        // Creamos la tabla de Usuarios
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('Admin', 'Professor', 'Student') DEFAULT 'Student',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Creamos la tabla de Materiales
        await connection.query(`
            CREATE TABLE IF NOT EXISTS materials (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(150) NOT NULL,
                description TEXT,
                file_path VARCHAR(255) NOT NULL,
                uploaded_by INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (uploaded_by) REFERENCES users(id)
            );
        `);

        console.log("¡Éxito! Base de datos 'bibliotech' y tablas creadas.");
        process.exit();
    } catch (error) {
        console.error("Error gigante:", error.message);
        console.error("Si dice 'ECONNREFUSED', significa que no tienes MariaDB instalado o encendido.");
        process.exit(1);
    }
}

setup();
