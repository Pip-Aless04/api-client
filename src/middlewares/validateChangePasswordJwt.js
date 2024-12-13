import jwt from 'jsonwebtoken';

export const authChangePasswordJWT = (req, res, next) => {
    const tokenKey = Object.keys(req.cookies).find(key => key.startsWith('change_password_token_'));
    if (!tokenKey) {
        console.error('No se encontró la cookie con el prefijo esperado.');
        return res.status(401).send('Token no válido');
    }

    const token = req.cookies[tokenKey];
    console.log('Token encontrado:', tokenKey, token);

    if (!token) {
        console.error('Token vacío o inválido.');
        return res.status(401).send('Token no válido');
    }

    jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
        if (err) {
            console.error('Error al verificar el token:', err.message);
            return res.status(403).send('Token no válido');
        }

        console.log('Usuario decodificado:', user);
        req.user = user;
        next();
    });
};


