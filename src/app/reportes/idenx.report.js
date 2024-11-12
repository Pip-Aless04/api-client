import { Router } from 'express';
import { createVacacionesRoutes } from "./routes/vaciones.routes.js";

export const reportesRoutes = ({ models }) => {
    const reportRouter = Router();
    
    reportRouter.use("/vacaciones", createVacacionesRoutes({ vacacionesModel: models.VacacionesModel }));
    //router.use("/incapacidades", createTalentosRouter({talentoModel: models.TalentoModel}));
    //router.use("/salidas_personal", createRespuestasRouter({/*respuestaModel: models.RespuestaModel*/}));
    //router.use("/traslados_personal", createRespuestasRouter({/*respuestaModel: models.RespuestaModel*/}));
    //router.use("/solicitud_cartas", createRespuestasRouter({/*respuestaModel: models.RespuestaModel*/}));

    return reportRouter;
};
