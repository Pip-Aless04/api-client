import { validatePartialReport, validateReport } from "../schemas/reports.schema.js";
import { createToken } from "../plugins/createJwt.plugin.js";
import { EmailPlugin } from "../plugins/sendEmail.plugin.js";
import { generateCode } from "../plugins/generateCode.plugin.js";
import { fileToBinary } from "../plugins/fileToBinary.plugin.js";

export class ReportesController {
    constructor({ ReportesModel }) {
        this.reportesModel = ReportesModel;
    }

    getAllReports = async (req, res) => {
        try {
            const { } = req.query;
            const result = await this.reportesModel.getAllReports();
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error.message);
            return res.status(500).json({ error: 'Error al obtener todos los usuarios' });
        }
    };

    saveReport = async (req, res) => {
        try {
            // Validación y conversión de datos inicial
            req.body.tipo_documento = parseInt(req.body.tipo_documento, 10);
            req.body.tipo_reporte = parseInt(req.body.tipo_reporte, 10);
            if (req.body.tipo_novedad ) {req.body.tipo_novedad = parseInt(req.body.tipo_novedad, 10); }
            if (req.body.tipo_carta ) {req.body.tipo_carta = parseInt(req.body.tipo_carta, 10); }
            if (req.body.tipo_salida ) {req.body.tipo_salida = parseInt(req.body.tipo_salida, 10); }
            if (req.body.motivo_salida ) {req.body.motivo_salida = parseInt(req.body.motivo_salida, 10); }
            console.log('Datos del reporte:', req.body);
            
            console.log('Body:', req.body); // Depuración de datos del formulario
            console.log('File:', req.file); // Depuración del archivo cargado
    
            // Validación de los datos enviados
            const validate = await validatePartialReport(req.body);
            console.log('Validación:', validate);
    
            if (!validate.success) {
                console.error('Validation Errors:', validate.error.errors);
                return res.status(400).json({
                    success: false,
                    error: 'Datos inválidos',
                    details: validate.error.errors,
                });
            }

            // Preparar datos del reporte
            const reportData = validate.data;
    
            // Adjuntar datos del documento al reporte
            reportData.col_id_solicita = req.user.info.id;
            reportData.col_jefe_inmediato = req.user.info.jefe_id;

            if (req.file) {
                const fileBinary = await fileToBinary(req.file);
                reportData.documento = {
                    docType: reportData.tipo_documento,
                    content: fileBinary,
                    name: req.file.originalname,
                    date: new Date(),
                };
            }
            
    
            // Guardar el reporte utilizando el modelo
            const result = await this.reportesModel.saveReports({reportData, fileData:reportData.documento});
            console.log(result);
            return res.status(200).send({
                success: true,
                message: 'Reporte enviado exitosamente',
                reportId: result.reportId,
            });
    
        } catch (error) {
            console.error('Error al enviar el reporte:', error.message);
            return res.status(500).json({ success: false, error: 'Error al enviar el reporte' });
        }
    };

    getAllTipoCartas = async (req, res) => {
        try {
            const { tipo, nombre, estado } = req.query;
            const result = await this.reportesModel.getAllTipoCartas({ tipo, nombre, estado });
            console.log(result);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener todos los reportes:', error.message);
            return res.status(500).json({ error: 'Error al obtener todos los reportes' });
        }
    };

    updateVacationStatus = async (req, res) => {
        try {
            const { id, estado } = req.body;
            console.log('ID del pendiente:', id);
            console.log('Estado:', estado);
            const result = await this.reportesModel.updateVacationStatus({id, estado});
            console.log(result);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error al actualizar el estado del pendiente:', error.message);
            return res.status(500).json({ error: 'Error al actualizar el estado del pendiente' });
        }
    }
};