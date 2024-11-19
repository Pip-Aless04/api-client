import { Router } from 'express';
import { AuthController } from "../controllers/auth.controller.js";
import { authUserJWT } from "../middlewares/validateUserJwt.middleware.js";
//import { saveUserInfo } from "../middlewares/saveUserInfo.middlaware.js";

export const createAuthRoutes = ({AuthModel}) => {
    const authRouter = Router();
    const authController = new AuthController({AuthModel});

    authRouter.post("/login",authController.authLogin); 
    authRouter.post("/register", authController.register);
    authRouter.post("/solicitar-cambio-clave", authUserJWT, authController.changePassword); 
    authRouter.patch("/changePassword", authUserJWT, authController.changePassword); 
    authRouter.post("/logout", authUserJWT, authController.logout);

    authRouter.post("/changePasswordPrueba", authController.changePasswordPrueba);

    return authRouter;
};
