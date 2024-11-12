import { createApp } from "./src/app.js";
import { ColaboradorModel } from "./src/models/colaborador.model.js";
import { ReportesModel } from "./src/models/reportes.model.js";
import { EvaluacionModel } from "./src/models/evaluacion.model.js";

createApp({ColaboradorModel, ReportesModel, EvaluacionModel});