import { Router } from 'express';
import {createAuthRoutes} from "./auth.routes.js";
import { reportesRoutes } from "./index.report.js";
import { createEvaluacionRoutes } from "./evaluacion.routes.js";


export const appRoutes = ({ColaboradorModel, ReportesModel, EvaluacionModel}) => {
    const appRouter = Router();
    
    appRouter.use("/auth", createAuthRoutes({ ColaboradorModel }));
    appRouter.use("/bienestar_integral", reportesRoutes({ ReportesModel }));
    appRouter.use("/evaluacion", createEvaluacionRoutes({ EvaluacionModel }));
    return appRouter;
};
