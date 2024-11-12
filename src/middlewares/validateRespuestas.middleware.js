export const authRespuestas = (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({ message: 'usuario no autenticado' });
    }

    // Maneja la cookie de respuestas asociada al usuario
    const respuestasKey = `respuestas${req.user.id}`;
    const respuestasCookie = req.cookies[respuestasKey];

    if (respuestasCookie) {
        try {
            // Intenta parsear la cookie de respuestas como JSON
            req.user.respuestas = JSON.parse(respuestasCookie);
        } catch (error) {
            console.error("Cookie de respuestas no es un JSON válido", error);
            req.user.respuestas = {}; // Asignar un objeto vacío si el JSON es inválido
        }
    } else {
        req.user.respuestas = {}; // Asignar un objeto vacío si la cookie no existe
    }

    next(); // Continua con el siguiente middleware o ruta
};
