import jwt from 'jsonwebtoken';

export const validateUserAccesPermission = (req, res, next) => {
    console.log('Entró a validación de permiso');

    const token = req.cookies.access_token;
    const subordinadosToken = req.cookies.subordinados_token;

    if (!token) {
        return res.status(401).render('errorPage', {
            title: '401 - Usuario no autenticado',
            message: 'Usuario no autenticado',
            errorCode: '401',
            backButtonText: 'Inicie sesión para autenticarse',
            backButtonHref: '/dhcoapp',
        });
    }

    // Verificar token principal
    jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).render('errorPage', {
                title: '403 - No autorizado',
                message: 'Token no válido',
                errorCode: '403',
                backButtonText: 'Vuelve al inicio',
                backButtonHref: '/dhcoapp/inicio',
            });
        }

        req.user = user; // Asignar datos del usuario
        console.log('Usuario decodificado:', req.user);

        const solicitud = req.params.solicitud;
        console.log('Solicitud:', solicitud);

        // Validar acceso para solicitudes específicas
        if (solicitud === 'historico') {
            if (req.user.info.permiso !== 2 && req.user.info.permiso !== 3) {
                return res.status(403).render('errorPage', {
                    title: '403 - Acceso denegado',
                    message: 'No tienes permiso para acceder a esta página',
                    errorCode: '403',
                    backButtonText: 'Vuelve al inicio',
                    backButtonHref: '/dhcoapp/inicio',
                });
            }
        }

        // Verificar token de subordinados si existe
        if (subordinadosToken) {
            jwt.verify(subordinadosToken, process.env.SECRET_JWT_KEY, (err, subordinados) => {
                if (err) {
                    console.warn('Token de subordinados no válido:', err.message);
                } else {
                    console.log('Token de subordinados válido:', subordinados);
                    req.user.subordinados = subordinados; // Asignar subordinados al usuario
                }
            });
        }

        next(); // Continuar si todo está validado
    });
};
