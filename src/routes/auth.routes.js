import { Router } from 'express';
import { AuthController } from "../controllers/auth.controller.js";
import { authUserJWT } from "../middlewares/validateUserJwt.middleware.js";
import { authChangePasswordJWT } from "../middlewares/validateChangePasswordJwt.js";


export const createAuthRoutes = ({AuthModel}) => {
    const authRouter = Router();
    const authController = new AuthController({AuthModel});

    authRouter.post("/login",authController.authLogin); 
    authRouter.post("/register", authController.register);
    authRouter.post("/requestPasswordReset", authController.requestPasswordReset);
    authRouter.post("/setNewPassword", authChangePasswordJWT, authController.setNewPassword);
    authRouter.get("/logout", authUserJWT, authController.logout);

    authRouter.post("/changePasswordHot", authController.changePasswordHot);

    return authRouter;
};
