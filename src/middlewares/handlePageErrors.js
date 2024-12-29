export const handlePageErrors = (err, req, res, next) => {
    const statusCode = err.status || res.statusCode || 500;
    const is404 = statusCode === 404;   

    console.log(statusCode);
    console.log(err);
    console.log(err.message);
    res.status(statusCode).render('errorPage', {
        title: is404 ? '404 - Pagina no encontrada' : '500 - Error interno del servidor',
        message: is404 ? 'Oops! La página que estás buscando no existe' : 'Oops! Ha ocurrido un error interno del servidor',
        errorCode: is404 ? '404' : '500',
        backButtonText: 'Vuelve al inicio',
        backButtonHref: '/dhcoapp/inicio',
    });
};