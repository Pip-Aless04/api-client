import { Router } from 'express';
import { EvaluacionController } from "../controllers/evaluacion.controller.js";
import { authUserJWT } from "../middlewares/validateUserJwt.middleware.js";
//import { saveUserInfo } from "../middlewares/saveUserInfo.middleware.js";

export const createEvaluacionRoutes = ({EvaluacionModel}) => {
    const evaluacionRouter = Router();
    const evaluacionModel = new EvaluacionController({EvaluacionModel})

    evaluacionRouter.use("/evaluacion", evaluacionModel.evaluacion); 
    evaluacionRouter.use("/califcar", evaluacionModel.calificar); 
    evaluacionRouter.use("/resultado", evaluacionModel.getResultado); 
    evaluacionRouter.use("/pdi", evaluacionModel.getPdi); 

    return evaluacionRouter;
};
