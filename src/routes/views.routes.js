import { Router } from 'express';
import { ViewController } from "../controllers/view.controller.js";
import { authUserJWT } from "../middlewares/validateUserJwt.middleware.js";
//import { saveUserInfo } from "../middlewares/saveUserInfo.middlaware.js";

export const createViewsRoutes = ({}) => {
    const viewsRouter = Router();
    const viewController = new ViewController();

    viewsRouter.get("/", viewController.login); 
    viewsRouter.get("/requestChangePassword", viewController.requestChangePassword);
    viewsRouter.get("/resetPassword", viewController.resetPassword);
    viewsRouter.get("/inicio", authUserJWT, viewController.inicio);

    return viewsRouter;
};
