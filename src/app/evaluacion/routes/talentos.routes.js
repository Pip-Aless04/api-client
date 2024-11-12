import { Router } from "express";
import { TalentoController } from "../controllers/talentos.controller.js";
import { authUserJWT } from "../../middlewares/validateUserJwt.middleware.js";

export const createTalentosRouter = ({talentoModel}) => {
    const talentosRouter = Router();

    const talentoController = new TalentoController({talentoModel})

    talentosRouter.get('/',authUserJWT, talentoController.getAll)
    talentosRouter.get('/:id', authUserJWT, talentoController.getById)

    return talentosRouter;
}