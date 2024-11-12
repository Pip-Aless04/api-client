export const saveUserInfo = (req, res, next) => {
    const token = req.cookies.access_token; 
    if (!token) return res.status(401).send('Usuario no autenticado');

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};