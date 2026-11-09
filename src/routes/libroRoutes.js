import { Router } from 'express';
import { LibroController } from '../controllers/libroController.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = Router();
const libroController = new LibroController();

// Ruta protegida con Multer para subir archivos (PDFs/Documentos)
router.post('/upload', upload.single('archivo'), (req, res) => libroController.subirLibro(req, res));
router.get('/libros', (req, res) => libroController.listarLibros(req, res));

export default router;