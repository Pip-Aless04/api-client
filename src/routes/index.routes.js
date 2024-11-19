import { Router } from 'express';
import {createAuthRoutes} from "./auth.routes.js";
import {createViewsRoutes} from "./views.routes.js";
//import { reportesRoutes } from "./reports.routes.js";
//import { createEvaluacionRoutes } from "./evaluacion.routes.js";


export const appRoutes = ({AuthModel, ReportesModel, EvaluacionModel}) => {
    const appRouter = Router();
    
    appRouter.use("/", createViewsRoutes({ }));
    appRouter.use("/auth", createAuthRoutes({ AuthModel }));
    //appRouter.use("/bienestar-integral", reportesRoutes({ ReportesModel }));
    //appRouter.use("/evaluacion", createEvaluacionRoutes({ EvaluacionModel }));
    return appRouter;
};
