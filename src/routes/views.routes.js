import { Router } from 'express';
import { ViewController } from "../controllers/view.controller.js";
import { authUserJWT } from "../middlewares/validateUserJwt.middleware.js";
import { validateUserAccesPermission } from "../middlewares/validateUserAccesPermission.middleware.js";
//import { saveUserInfo } from "../middlewares/saveUserInfo.middlaware.js";

export const createViewsRoutes = ({ReportesModel, EvaluacionModel, AuthModel}) => {
    const viewsRouter = Router();
    const viewController = new ViewController({ReportesModel, EvaluacionModel, AuthModel});

    // Inicio y Auth
    viewsRouter.get("/", viewController.login); 
    viewsRouter.get("/requestChangePassword", viewController.requestChangePassword);
    viewsRouter.get("/resetPassword", viewController.resetPassword);
    viewsRouter.get("/inicio", authUserJWT, viewController.inicio);

    // Bienestar Integral
    viewsRouter.get("/bienestar-integral/:solicitud", authUserJWT, validateUserAccesPermission, viewController.solicitudRports);
    viewsRouter.get("/mantenimiento/:solicitud", authUserJWT, viewController.solicitudMantenimiento);

    viewsRouter.get("/pruebaHistorico", authUserJWT, viewController.pruebaHistorico);

    // Evaluacion
    viewsRouter.get("/evaluacion/inicio", authUserJWT, viewController.evaluacion);
    viewsRouter.get("/evaluacion/mas_info", authUserJWT, viewController.masInfo);
    viewsRouter.get("/evaluacion/evaluaciones/:colId", authUserJWT, viewController.evaluaciones);
    viewsRouter.get("/evaluacion/resultado/:colId/:evalId", authUserJWT, viewController.resultado);
    viewsRouter.get("/evaluacion/pdi/:colId/:evalId", authUserJWT, viewController.pdi);

    return viewsRouter;
};
