import { Router } from "express";
import { VacacionesController } from "../controllers/vacaciones.controller.js";
import { authUserJWT } from "../../middlewares/validateUserJwt.middleware.js";

export const createVacacionesRoutes = ({vacacionesModel}) => {
    const vacacionesRouter = Router();

    const vacacionesController = new VacacionesController({vacacionesModel})

    vacacionesRouter.get("/", /*authUserJWT,*/ vacacionesController.getAll); // Protegida
    vacacionesRouter.get("/:id", authUserJWT, vacacionesController.getById); // Protegida
    vacacionesRouter.post("/register", authUserJWT, vacacionesController.register);

    return vacacionesRouter;
}
