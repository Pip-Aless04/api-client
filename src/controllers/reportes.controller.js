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
            if (req.body.tipo_novedad) { req.body.tipo_novedad = parseInt(req.body.tipo_novedad, 10); }
            if (req.body.tipo_carta) { req.body.tipo_carta = parseInt(req.body.tipo_carta, 10); }
            if (req.body.tipo_salida) { req.body.tipo_salida = parseInt(req.body.tipo_salida, 10); }
            if (req.body.motivo_salida) { req.body.motivo_salida = parseInt(req.body.motivo_salida, 10); }
            if (req.body.pais_solicita) { req.body.pais_solicita = parseInt(req.body.pais_solicita, 10); }
            if (req.body.depto_traslado) { req.body.depto_traslado = parseInt(req.body.depto_traslado, 10); }
            console.log("wqefqfq", req.body.tipo_reporte);
            if (req.body.tipo_reporte !== 2){req.body.estado = 'P'}
            console.log('Datos del reporte:', req.body);

            // Verificación de archivos
            console.log('Files:', req.files); // Mostrar todos los archivos cargados
    
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
            console.log({usuario_info:req.user});
            reportData.col_id_solicita = req.user.info.id;
            if (!req.body.col_id_aplica) { reportData.col_id_aplica = req.user.info.id; }
            reportData.tipo_reporte === 1 ? reportData.tipo_documento = [1,2,3,4] : reportData.tipo_documento = req.body.tipo_documento;
    
            // Si hay archivos, procesarlos
            if ((req.file || (req.files && req.files.length > 0))) {
                const fileDocuments = await Promise.all(req.files.map(async (file) => {
                    const fileBinary = await fileToBinary(file);
                    return {
                        docType: reportData.tipo_documento,
                        extension: file.mimetype,
                        content: fileBinary,
                        name: file.originalname,
                        date: new Date(),
                    };
                }));
                reportData.documentos = fileDocuments; // Guardamos todos los archivos en un array
            }
    
            console.log(reportData.documentos); // Ver los documentos
    
            // Guardar el reporte
            const result = await this.reportesModel.saveReports({ reportData, fileData: reportData.documentos || [] });
            console.log(result);

            if (!result.success) {
                await this.reportesModel.logError({errorMessage: `Error en el result del controller save report: ${result.error.message}`});
                return res.status(500).json({ success: false, error: `Error al guardar el reporte: ${result.error.message}` });
            }
            
            const emailMessage = new EmailPlugin();

            console.log(req.body.tipo_reporte);
            
            await emailMessage.sendEmailReportRequested({
                to: req.user.info.email,
                subject: 'Solicitud realizada con éxito',
                subordinado: req.user.info.nombre,
                jefe: req.user.info.nombre_jefe,
                email_jefe: req.user.info.email_jefe,
                report: req.body.tipo_reporte
            });

            // Enviar correo electrónico
            return res.status(200).send({
                success: true,
                message: 'Reporte enviado exitosamente',
                reportId: result.reportId,
            });
    
        } catch (error) {
            await this.reportesModel.logError({errorMessage: `Error en el catch del controller save report: ${error.message}`});
            console.error('Error al enviar el reporte:', error); // Esto muestra el error completo en el servidor
            return res.status(500).json({ 
                success: false, 
                error: 'Error al enviar el reporte'
                //error: error.message || 'Error desconocido', 
                //details: error.stack // Incluye la traza para depuración adicional
            });
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

    getFileReportById = async (req, res) => {
        try {
            const { id } = req.params;
            const [result] = await this.reportesModel.getFileReportById({id});

            console.log(result);

            res.setHeader('Content-Type', `inline; filename="${result.nombre_documento}"`);
            res.setHeader('Content-Type', result.extension);
            res.send(result.documento);

        } catch (error) {
            console.error('Error al obtener el archivo:', error.message);
            return res.status(500).json({ error: 'Error al obtener el archivo' });
        }
    };

    getHistoricoSalidas = async (req, res) => {
        try {
            const result = await this.reportesModel.getHistoricoSalidas();
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener todos los reportes:', error.message);
            return res.status(500).json({ error: 'Error al obtener todos los reportes' });
        }
    }
};