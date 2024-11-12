import { Router } from "express";
import { ViewsController } from "../controllers/views.controller.js";
import { authUserJWT } from "../../middlewares/validateUserJwt.middleware.js";
import { saveUserInfo } from "../../middlewares/saveUserInfo.middlaware.js";

export const createViewsRoutes = ({viewsModel}) => {
    const viewsRouter = Router();

    const viewsController = new ViewsController({viewsModel});
    
    viewsRouter.get("/", /*authUserJWT,*/ viewsController.getAll); // Protegida
    
    return viewsRouter;
}