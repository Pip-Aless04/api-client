import { Router } from 'express';
import { ViewController } from "../controllers/view.controller.js";
import { authUserJWT } from "../middlewares/validateUserJwt.middleware.js";
//import { saveUserInfo } from "../middlewares/saveUserInfo.middlaware.js";

export const createViewsRoutes = ({}) => {
    const viewsRouter = Router();
    const viewController = new ViewController();

    viewsRouter.get("/", viewController.login); 
    viewsRouter.get("/inicio", viewController.inicio);

    return viewsRouter;
};
