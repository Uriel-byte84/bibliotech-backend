import { LibroRepository } from '../repositories/libroRepository.js';

const libroRepo = new LibroRepository();

export class LibroController {
    async subirLibro(req, res) {
        try {
            const { titulo, autor } = req.body;
            const archivo = req.file ? req.file.filename : null;
            const userId = req.user ? req.user.id : 1; // ID del usuario autenticado por token

            if (!titulo || !autor || !archivo) {
                return res.status(400).json({ error: 'Todos los campos y el archivo son obligatorios.' });
            }

            await libroRepo.crear(titulo, autor, archivo, userId);
            res.status(201).json({ mensaje: '¡Libro/Material subido con éxito mediante Multer!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async listarLibros(req, res) {
        try {
            const libros = await libroRepo.obtenerTodos();
            res.json(libros);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}