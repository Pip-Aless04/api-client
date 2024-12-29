import jwt from 'jsonwebtoken';

export const validateUserAccesPermission = (req, res, next) => {
    console.log('Entró a validación de permiso');

    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).send('Usuario no autenticado');
    }

    // Verificar token principal
    jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Token no válido');
        }

        req.user = user; // Asignar datos del usuario
        console.log('Usuario decodificado:', req.user);

        const solicitud = req.params.solicitud; // Cambiar "view" por "solicitud" si es el parámetro correcto
        console.log('Solicitud:', solicitud);

        if (solicitud === 'historico') {
            if (req.user.info.permiso !== 2) { // Validar permiso correctamente
                res.status(403).render('errorPage', {
                    title: '403 - Acceso denegado',
                    message: 'No tienes permiso para acceder a esta página',
                    errorCode: '403',
                    backButtonText: 'Vuelve al inicio',
                    backButtonHref: '/dhcoapp/inicio',
                });
            }
        }

        next(); // Solo continuar si todo está validado
    });
};
