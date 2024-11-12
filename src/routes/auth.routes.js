import { Router } from 'express';
import { AuthController } from "../controllers/auth.controller.js";
import { authUserJWT } from "../middlewares/validateUserJwt.middleware.js";
import { saveUserInfo } from "../middlewares/saveUserInfo.middlaware.js";

export const createAuthRoutes = ({ColaboradorModel}) => {
    const authRouter = Router();
    const colaboradorModel = new AuthController({ColaboradorModel})

    authRouter.use("/login", colaboradorModel.authColaborador); 
    authRouter.use("/changePassword", colaboradorModel.changePassword); 

    return authRouter;
};
