import jwt from 'jsonwebtoken';

export const authUserJWT = (req, res, next) => {
    const token = req.cookies.access_token; 
    if (!token) return res.status(401).send('Usuario no autenticado');

    jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
        if (err) return res.status(403).send('Token no válido');
        req.user = user; 
        next();
    });
};

