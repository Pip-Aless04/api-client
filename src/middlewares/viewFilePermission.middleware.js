import jwt from 'jsonwebtoken';

export const viewFilePermission = (req, res, next) => {
    const token = req.cookies.access_token; 

    if (!token) {
        return res.status(401).send('Usuario no autenticado');
    }

    // Verificar token principal
    jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
        if (err) return res.status(403).send('Token no válido');

        req.user = user; // Asignar datos del usuario

        if (user.permiso !== 2) {
            return res.status(403).send('No tiene permiso para acceder a esta página');
        }

        next();
    });
};
