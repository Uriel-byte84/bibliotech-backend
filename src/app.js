import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { inicializarBaseDeDatos } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import libroRoutes from './routes/libroRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir frontend y carpeta de archivos subidos (uploads)
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use('/api', authRoutes);
app.use('/api', libroRoutes);

async function iniciarServidor() {
    await inicializarBaseDeDatos();
    app.listen(PORT, () => {
        console.log(`🚀 Servidor Bibliotech definitivo corriendo en http://localhost:${PORT}`);
    });
}

iniciarServidor();