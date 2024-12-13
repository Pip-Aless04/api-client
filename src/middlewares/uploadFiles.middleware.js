import multer from 'multer';
import path from 'path';

// Configurar el almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Carpeta donde se guardarán los archivos
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Renombrar el archivo para evitar conflictos
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// Validar tipo de archivo
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error('Tipo de archivo no permitido.'), false); // Rechazar el archivo
    }
};

// Middleware de Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB
    fileFilter: fileFilter
});

export default upload;
