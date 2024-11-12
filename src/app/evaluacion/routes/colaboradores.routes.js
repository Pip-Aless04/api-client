import { Router } from "express";
import { ColaboradorController } from "../controllers/colaboradores.controller.js";
import { authUserJWT } from "../../middlewares/validateUserJwt.middleware.js";
import { saveUserInfo } from "../../middlewares/saveUserInfo.middlaware.js";

export const createColaboradorRoutes = ({colaboradorModel}) => {
    const colaboradorRouter = Router();

    const colaboradorController = new ColaboradorController({colaboradorModel})

    colaboradorRouter.get("/", /*authUserJWT,*/ colaboradorController.getAll); // Protegida
    colaboradorRouter.get("/:id", authUserJWT, colaboradorController.getById); // Protegida
    colaboradorRouter.post("/login", colaboradorController.login, saveUserInfo);
    colaboradorRouter.post("/register", colaboradorController.register);
    colaboradorRouter.post("/logout", authUserJWT, colaboradorController.logout); // Protegida
    colaboradorRouter.post("/changeJwt", authUserJWT, colaboradorController.changeJwt); // Protegida

    return colaboradorRouter;
}
