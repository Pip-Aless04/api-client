import { Router } from 'express';
import { ReportesController } from "../controllers/reportes.controller.js";
import { authUserJWT } from "../middlewares/validateUserJwt.middleware.js";
import { viewFilePermission } from "../middlewares/viewFilePermission.middleware.js";
import upload from "../middlewares/uploadFiles.middleware.js";


export const createReportsRoutes = ({ReportesModel}) => {
    const reportRouter = Router();
    const reportController = new ReportesController({ReportesModel});

    //reportRouter.get("/tipo_reportes", authUserJWT, reportController.getAllReports); 
    reportRouter.post("/guardar_reporte", authUserJWT, upload.single('file'), reportController.saveReport);
    reportRouter.post("/aceptar_rechazar_vacaciones", authUserJWT, reportController.updateVacationStatus);
    reportRouter.get("/ver-archivo/:id", authUserJWT, reportController.getFileReportById);

    return reportRouter;
};