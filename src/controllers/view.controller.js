import { infoReportView } from "../plugins/infoReportView.js";
import { getFilterInfo } from "../plugins/filterInfo.plugin.js";
export class ViewController {
    
    constructor({ AuthModel, ReportesModel, EvaluacionModel }) {
        this.authModel = AuthModel;
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
            const user = req.user?.info;
    
            if (!user) {
                return res.status(400).json({ error: 'Información del usuario no encontrada' });
            }
    
            console.log('Usuario:', user);
    
            // Si el usuario no tiene subordinados a cargo, renderiza directamente
            if (user.permiso == 1) {
                return res.render('inicio', { user, pendientes: [] });
            }
    
            // Verifica y extrae los subordinados del usuario
            const subordinados = Array.isArray(req.user?.subordinados?.info) 
                ? req.user.subordinados.info 
                : [];
    
            console.log('Subordinados:', subordinados);
    
            // Obtiene los reportes pendientes
            let pendientes;

            if (user.permiso === 3) {
                console.log('permiso 3');
                // Si el usuario es un jefe, obtiene los reportes pendientes de todos los reportes
                pendientes = await this.reportesModel.getPendingReports({ 
                    
                });
            } else if (user.permiso == 4) {
                console.log('permiso 4');
                // Si el usuario es un subordinado, obtiene los reportes pendientes de los reportes que tiene asignado
                pendientes = await this.reportesModel.getPendingReports({ 
                    jefe_id: user.id,
                    estado : 'S',
                    reporte: 2
                });
                console.log('Pendientes:', pendientes);
            }
    
            console.log('Pendientes:', pendientes);
            
            const filterInputsInfo = await getFilterInfo({model: this.reportesModel});
            console.log({filterInputsInfo});

            // Renderiza la vista con los datos preparados
            res.render('inicio', { 
                user, 
                subordinados, 
                pendientes,
                filterInputsInfo
            });
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };    
    
    solicitudRports = async (req, res) =>{
        try {
            const { tipo_reporte } = req.query;
            const { solicitud } = req.params;
            const user = req.user.info;
            const userSubordinados = req?.user?.subordinados?.info;
            console.log(user)
            console.log(solicitud)
            //console.log(req)
            console.log({userSubordinados})
            const reportData = await infoReportView({user:user, view: solicitud, model: this.reportesModel, tipo_reporte});
            console.log(reportData)

            if (!reportData.needInfo) {
                return res.render(`reportes/${solicitud}`, {user});
            }

            if (solicitud === 'traslado_personal') {
                return res.render(`reportes/${solicitud}`, {user, reportData, userSubordinados})
            }
            
            res.render(`reportes/${solicitud}`, {user, 
                                                reportData
                                                });
        } catch (error) {
            console.log(error)
        }
    }

    solicitudMantenimiento = async (req, res) =>{
        try {
            const { solicitud } = req.params;
            const user = req.user.info;
            console.log(user)
            console.log(solicitud)
            
            const reportData = await infoReportView({view: solicitud, model: this.authModel});
            
            res.render(`mantenimiento/${solicitud}`, {user,
                                                    reportData
                                                });
        } catch (error) {
            console.log(error)
        }
    };

    pruebaHistorico = async (req, res) => {
        try {
            const data  = [
                { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinedDate: '2023-01-15' },
                { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinedDate: '2023-02-20' },
                { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', joinedDate: '2023-03-10' },
                { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', joinedDate: '2023-04-05' },
                { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active', joinedDate: '2023-05-12' },
            ];
            const columns = Object.keys(data[0]); // Obtén las columnas dinámicamente
            res.render('reportes/historico2', { data, columns });  // Cambié `mockData` por `data`
        } catch (error) {
            console.log(error);
            res.status(500).send('Error interno del servidor');
        }
    };
    
    evaluacion = async (req, res) => {
        try {
            const user = req.user.info;
            const subordinados = req.user?.subordinados?.info || [];
            //const respuestas = ...jalar respuestas
            console.log({subordinados})
            res.render('evaluacion/inicio', { user, subordinados });

        } catch (error) {
            console.log(error);
            res.status(500).send('Error interno del servidor');
        }
    }

    masInfo = async (req, res) => {
        try {
            res.render('evaluacion/mas_info')
        } catch (error) {
            console.log(error);
            res.status(500).send('Error interno del servidor');
        }
    }

    evaluaciones = async (req, res) => {
        try {
            const colId = req.params.colId;
            console.log(colId);

            const historicoResumido = await this.evaluacionModel.getHistoricoResumidoEvals({colId});
            console.log(historicoResumido);

            res.render('evaluacion/historico_evals', {historicoResumido, colId});
        } catch (error) {
            console.log(error);
            res.status(500).send('Error interno del servidor');
        }
    }
    
    resultado = async (req, res) => {
        try {
            console.log('entro a resultado controller view')
            const {colId, evalId} = req.params;
            console.log(colId, evalId)
            const resultado = await this.evaluacionModel.getEvalResultado({colId, evalId});
            console.log(resultado);
            res.render('evaluacion/resultados', {resultado, colId, evalId});
        } catch (error) {
            console.log(error);
            res.status(500).send('Error interno del servidor');
        }
    }

    pdi = async (req, res) => {
        try {
            console.log('entro a pdi controller view')
            const {colId, evalId} = req.params;
            console.log(colId, evalId)
            const {talentos, pdi, avances} = await this.evaluacionModel.getEvalPdi({colId, evalId});

            res.render('evaluacion/pdi', {colId, evalId, talentos, pdi, avances});
        } catch (error) {
            console.log(error);
            res.status(500).send('Error interno del servidor');
        }
    }
}