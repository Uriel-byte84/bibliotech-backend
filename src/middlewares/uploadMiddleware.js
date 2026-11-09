import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento local de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para evitar conflictos
    }
});

// Filtrar para aceptar solo documentos (PDFs, Word, etc.)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.includes('document') || file.mimetype.includes('text')) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no válido. Solo se permiten documentos y PDFs.'), false);
    }
};

export const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Límite de 10MB
    fileFilter: fileFilter
});