import { createApp } from "./src/app.js";
import { AuthModel } from "./src/models/auth.model.js";
import { ReportesModel } from "./src/models/reportes.model.js";
import { EvaluacionModel } from "./src/models/evaluacion.model.js";

createApp({AuthModel, ReportesModel, EvaluacionModel});