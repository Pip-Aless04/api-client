import { infoReportView } from "../plugins/infoReportView.js";
export class ViewController {
    
    constructor({ ReportesModel, EvaluacionModel }) {
        this.reportesModel = ReportesModel;
        this.evaluacionModel = EvaluacionModel;
    }
    login = async (req, res) => {
        try {
            const userId = req.user;
            console.log(userId);
            res.clearCookie('access_token');
            res.clearCookie('subordinados_token');
            //res.clearCookie(`change_password_token${userId}`);
            res.render('login', { error: null });
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };

    requestChangePassword = async (req, res) => {
        try {
            res.render('request-change-password', { error: null });
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };

    resetPassword = async (req, res) => {
        try {
            res.render('reset-password', { error: null });
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };

    inicio = async (req, res) => {
        try {
            const user = req.user.info;
            console.log('user', user.id);
    
            // Asegurarte de extraer la lista de subordinados desde req.user.subordinados.info
            const subordinados = Array.isArray(req.user.subordinados.info) ? req.user.subordinados.info : [];
            console.log('Subordinados:', subordinados); // Verifica los datos de subordinados
    
            const pendientes = await this.reportesModel.getAllReports({ tipo_reporte: 2, col_jefe_inmediato: user.id });
            console.log('Pendientes:', pendientes); // Verifica los datos de pendientes
    
            // Mapear pendientes para agregar el nombre del solicitante
            const pendientesConNombres = pendientes.map(pendiente => {
                const solicitante = subordinados.find(sub => String(sub.id) === String(pendiente.col_id_solicita));
                return {
                    ...pendiente,
                    nombreSolicitante: solicitante ? solicitante.nombre : 'Desconocido'
                };
            });
    
            console.log('Pendientes con nombres:', pendientesConNombres);
    
            res.render('inicio', { user, subordinados, pendientes: pendientesConNombres });
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };    
    
    solicitud = async (req, res) =>{
        try {
            const { solicitud } = req.params;
            console.log(solicitud)
            const user = req.user.info;
            const userSubordinados = req.user.subordinados;
            console.log(user)
            console.log(solicitud)
            console.log(userSubordinados)
            const reportData = await infoReportView({view: solicitud, model: this.reportesModel});
            
            if (!reportData.needInfo) {
                return res.render(`reportes/${solicitud}`, {user});
            }

            console.log(reportData)
            res.render(`reportes/${solicitud}`, {user , 
                                                userSubordinados,
                                                reportData
                                                });
        } catch (error) {
            console.log(error)
        }
    }
}