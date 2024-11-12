import { Router } from "express";
//import { RespuestaController } from "../controllers/respuestas.controller.js"; 
import { authUserJWT } from "../../middlewares/validateUserJwt.middleware.js";

export const createRespuestasRouter = ({respuestaModel}) => {
    const respuestasRouter = Router();

    //const respuestaController = new RespuestaController({respuestaModel})

    respuestasRouter.get('/',authUserJWT,((req,res)=>{res.send('respuestas')}))
    //respuestasRouter.get('/',authUserJWT,respuestaController.getAll)   
    
    return respuestasRouter;
}