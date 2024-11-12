import { Router } from 'express';
import { createViewsRoutes } from "./routes/views.routes.js";
import { createColaboradorRoutes } from "./routes/colaboradores.routes.js";
import { createTalentosRouter } from "./routes/talentos.routes.js";
import { createRespuestasRouter } from "./routes/respuestas.routes.js";

export const evaluacionRoutes = ({ models }) => {
    const evalRouter = Router();
    
    evalRouter.use("/", createViewsRoutes({viewsModel: models.ViewsModel}));
    
    evalRouter.use("/colaboradores", createColaboradorRoutes({ colaboradorModel: models.ColaboradorModel }));
    evalRouter.use("/talentos", createTalentosRouter({talentoModel: models.TalentoModel}));
    evalRouter.use("/respuestas", createRespuestasRouter({respuestaModel: models.RespuestaModel}));

    return evalRouter;
};
