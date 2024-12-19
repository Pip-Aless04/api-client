    import sql from 'mssql';
    import { connection } from "../db/db_connection.js";
    import bcrypt from 'bcrypt';
    import { bcryptPlugin } from '../plugins/encrypt.plugin.js';

    export class ReportesModel{

        static async getAllReports(filters) {
            try {
                console.log(filters);
                
                let query = `
                    SELECT 
                        R.rep_id AS id,
                        R.rep_col_id_solicita AS col_id_solicita,
                        R.rep_col_jefe_inmediato AS col_jefe_inmediato,
                        R.rep_tipo_reporte AS tipo_reporte,
                        R.rep_detalle_reporte AS detalle_reporte,
                        R.rep_tipo_salida AS tipo_salida,
                        R.rep_motivo_salida AS motivo_salida,
                        R.rep_tipo_novedad AS tipo_novedad,
                        R.rep_tipo_carta AS tipo_carta,
                        R.rep_pais_solicita AS pais_solicita,
                        R.rep_fec_inicio AS fecha_inicio,
                        R.rep_fec_fin AS fecha_fin,
                        R.rep_area_actual AS area_actual,
                        R.rep_area_traslado AS area_traslado,
                        R.rep_fec_envio_doc AS fecha_envio_doc,
                        R.rep_otro AS otro,
                        R.rep_email_envio AS email_envio,
                        R.rep_estado AS estado,
                        R.rep_fecha_transaccion AS fecha_transaccion
                    FROM reporte R
                    WHERE 1=1
                `;
    
                const request = connection.request();
    
                // Validación de filtros y parametrización segura
                if (filters.id) {
                    query += ` AND R.rep_id = @id`;
                    request.input('id', sql.Int, filters.id);
                }
                
                if (filters.col_id_solicita) {
                    query += ` AND R.rep_col_id_solicita = @col_id_solicita`;
                    request.input('col_id_solicita', sql.UniqueIdentifier, filters.col_id_solicita);
                }

                if (filters.col_jefe_inmediato) {
                    query += ` AND R.rep_col_jefe_inmediato = @col_jefe_inmediato`;
                    request.input('col_jefe_inmediato', sql.UniqueIdentifier, filters.col_jefe_inmediato);
                }

                if (filters.tipo_reporte) {
                    query += ` AND R.rep_tipo_reporte = @tipo_reporte`;
                    request.input('tipo_reporte', sql.Int, filters.tipo_reporte);
                }

                if (filters.tipo_salida) {
                    query += ` AND R.rep_tipo_salida = @tipo_salida`;
                    request.input('tipo_salida', sql.Int, filters.tipo_salida);
                }

                if (filters.motivo_salida) {
                    query += ` AND R.rep_motivo_salida = @motivo_salida`;
                    request.input('motivo_salida', sql.Int, filters.motivo_salida);
                }

                if (filters.tipo_novedad) {
                    query += ` AND R.rep_tipo_novedad = @tipo_novedad`;
                    request.input('tipo_novedad', sql.Int, filters.tipo_novedad);
                }

                if (filters.tipo_carta) {
                    query += ` AND R.rep_tipo_carta = @tipo_carta`;
                    request.input('tipo_carta', sql.Int, filters.tipo_carta);
                }

                if (filters.pais_solicita) {
                    query += ` AND R.rep_pais_solicita = @pais_solicita`;
                    request.input('pais_solicita', sql.Int, filters.pais_solicita);
                }

                if (filters.fecha_inicio) {
                    query += ` AND R.rep_fec_inicio = @fecha_inicio`;
                    request.input('fecha_inicio', sql.DateTime, filters.fecha_inicio);
                }                

                if (filters.fecha_fin) {
                    query += ` AND R.rep_fec_fin = @fecha_fin`;
                    request.input('fecha_fin', sql.DateTime, filters.fecha_fin);
                }

                if (filters.area_actual) {
                    query += ` AND R.rep_area_actual = @area_actual`;
                    request.input('area_actual', sql.Int, filters.area_actual);
                }   

                if (filters.area_traslado) {
                    query += ` AND R.rep_area_traslado = @area_traslado`;
                    request.input('area_traslado', sql.Int, filters.area_traslado);
                }

                if (filters.fecha_envio_doc) {
                    query += ` AND R.rep_fec_envio_doc = @fecha_envio_doc`;
                    request.input('fecha_envio_doc', sql.DateTime, filters.fecha_envio_doc);
                }                

                if (filters.otro) {
                    query += ` AND R.rep_otro = @otro`;
                    request.input('otro', sql.NVarChar, filters.otro);
                }

                if (filters.email_envio) {
                    query += ` AND R.rep_email_envio = @email_envio`;
                    request.input('email_envio', sql.NVarChar, filters.email_envio);
                }
                
                if (filters.estado) {
                    query += `AND R.rep_estado = @estado`;
                    request.input('estado', sql.NVarChar, filters.estado);
                }
                
                console.log(query);
                const result = await request.query(query);

                return result.recordset;
            } catch (error) {
                console.error('Error obteniendo todos los reportes:', error.message);
                return { success: false, error: 'Error obteniendo todos los reportes' };
            }
        }

        static async getAllTipoSalida (filters={}) {
            try {
                let query = `
                    SELECT 
                    TS.ts_id AS id,
                    TS.ts_nombre AS nombre,
                    TS.ts_estado AS estado
                    FROM tipo_salida TS
                    WHERE 1=1
                `;
        
                const params = [];
        
                // Agregar condiciones dinámicas basadas en los filtros
                if (filters.id) {
                    query += ` AND LOWER(TS.ts_id) LIKE LOWER(@id)`;
                    params.push({ name: 'id', type: sql.Int, value: filters.id });
                }
                if (filters.nombre) {
                    query += ` AND LOWER(TS.ts_nombre) LIKE LOWER(@nombre)`;
                    params.push({ name: 'nombre', type: sql.NVarChar, value: `%${filters.nombre}%` });
                }
                if (filters.estado) {
                    query += ` AND LOWER(TS.ts_estado) LIKE LOWER(@estado)`;
                    params.push({ name: 'estado', type: sql.NVarChar, value: filters.estado });
                }
        
                // Preparar y ejecutar la consulta con los parámetros
                const request = connection.request();
                params.forEach(param => request.input(param.name, param.type, param.value));
                const result = await request.query(query);

                return result.recordset;
        
            } catch (err) {
                console.error('Error al obtener los colaboradores:', err.message);
                throw new Error('Error al obtener los colaboradores');
            }
        }

        static async getAllMotivoSalida (filters={}) {
            try {
                let query = `
                    SELECT 
                    MS.ms_id AS id,
                    MS.ms_nombre AS nombre,
                    MS.ms_estado AS estado
                    FROM motivo_salida MS
                    WHERE 1=1
                `;
        
                const params = [];
        
                // Agregar condiciones dinámicas basadas en los filtros
                if (filters.id) {
                    query += ` AND LOWER(MS.ms_id) LIKE LOWER(@id)`;
                    params.push({ name: 'id', type: sql.Int, value: filters.id });
                }
                if (filters.nombre) {
                    query += ` AND LOWER(MS.ms_nombre) LIKE LOWER(@nombre)`;
                    params.push({ name: 'nombre', type: sql.NVarChar, value: `%${filters.nombre}%` });
                }
                if (filters.estado) {
                    query += ` AND LOWER(MS.ms_estado) LIKE LOWER(@estado)`;
                    params.push({ name: 'estado', type: sql.NVarChar, value: filters.estado });
                }
        
                // Preparar y ejecutar la consulta con los parámetros
                const request = connection.request();
                params.forEach(param => request.input(param.name, param.type, param.value));
                const result = await request.query(query);

                return result.recordset;
        
            } catch (err) {
                console.error('Error al obtener los colaboradores:', err.message);
                throw new Error('Error al obtener los colaboradores');
            }
        }

        static async getAllTipoNovedad (filters={}) {
            try {
                let query = `
                    SELECT 
                    TN.tn_id AS id,
                    TN.tn_nombre AS nombre,
                    TN.tn_estado AS estado
                    FROM tipo_novedad TN
                    WHERE 1=1
                `;
        
                const params = [];
        
                // Agregar condiciones dinámicas basadas en los filtros
                if (filters.id) {
                    query += ` AND LOWER(TN.tn_id) LIKE LOWER(@id)`;
                    params.push({ name: 'id', type: sql.Int, value: filters.id });
                }
                if (filters.nombre) {
                    query += ` AND LOWER(TN.tn_nombre) LIKE LOWER(@nombre)`;
                    params.push({ name: 'nombre', type: sql.NVarChar, value: `%${filters.nombre}%` });
                }
                if (filters.estado) {
                    query += ` AND LOWER(TN.tn_estado) LIKE LOWER(@estado)`;
                    params.push({ name: 'estado', type: sql.NVarChar, value: filters.estado });
                }
        
                // Preparar y ejecutar la consulta con los parámetros
                const request = connection.request();
                params.forEach(param => request.input(param.name, param.type, param.value));
                const result = await request.query(query);

                return result.recordset;
        
            } catch (err) {
                console.error('Error al obtener los colaboradores:', err.message);
                throw new Error('Error al obtener los colaboradores');
            }
        }

        static async getAllTipoCarta (filters={})  {
            try {
                let query = `
                    SELECT 
                    TC.tc_id AS id,
                    TC.tc_nombre AS nombre,
                    TC.tc_estado AS estado
                    FROM tipo_carta TC
                    WHERE 1=1
                `;
        
                const params = [];
        
                // Agregar condiciones dinámicas basadas en los filtros
                if (filters.id) {
                    query += ` AND LOWER(TC.tc_id) LIKE LOWER(@id)`;
                    params.push({ name: 'id', type: sql.Int, value: filters.id });
                }
                if (filters.nombre) {
                    query += ` AND LOWER(TC.tc_nombre) LIKE LOWER(@nombre)`;
                    params.push({ name: 'nombre', type: sql.NVarChar, value: `%${filters.nombre}%` });
                }
                if (filters.estado) {
                    query += ` AND LOWER(TC.tc_estado) LIKE LOWER(@estado)`;
                    params.push({ name: 'estado', type: sql.NVarChar, value: filters.estado });
                }
        
                // Preparar y ejecutar la consulta con los parámetros
                const request = connection.request();
                params.forEach(param => request.input(param.name, param.type, param.value));
                const result = await request.query(query);

                return result.recordset;
        
            } catch (err) {
                console.error('Error al obtener los colaboradores:', err.message);
                throw new Error('Error al obtener los colaboradores');
            }
        }

        static async getAllDeptos(filters={}){
            try {
                let query = `
                    SELECT 
                    D.depto_id AS id,
                    D.depto_nombre AS nombre,
                    D.depto_estado AS estado
                    FROM departamento D
                    WHERE 1=1
                `;
        
                const params = [];
        
                // Agregar condiciones dinámicas basadas en los filtros
                if (filters.id) {
                    query += ` AND LOWER(D.depto_id) LIKE LOWER(@id)`;
                    params.push({ name: 'id', type: sql.Int, value: filters.id });
                }
                if (filters.nombre) {
                    query += ` AND LOWER(D.depto_nombre) LIKE LOWER(@nombre)`;
                    params.push({ name: 'nombre', type: sql.NVarChar, value: `%${filters.nombre}%` });
                }
                if (filters.estado) {
                    query += ` AND LOWER(D.depto_estado) LIKE LOWER(@estado)`;
                    params.push({ name: 'estado', type: sql.NVarChar, value: filters.estado });
                }
        
                // Preparar y ejecutar la consulta con los parámetros
                const request = connection.request();
                params.forEach(param => request.input(param.name, param.type, param.value));
                const result = await request.query(query);

                return result.recordset;
        
            } catch (err) {
                console.error('Error al obtener los colaboradores:', err.message);
                throw new Error('Error al obtener los colaboradores');
            }
        }

        static async getAllTipoCartas(filters={}){
            try {
                let query = `
                    SELECT 
                    TC.tc_id AS id,
                    TC.tc_nombre AS nombre,
                    TC.tc_estado AS estado
                    FROM tipo_carta TC
                    WHERE 1=1
                `;
        
                const params = [];
        
                // Agregar condiciones dinámicas basadas en los filtros
                if (filters.id) {
                    query += ` AND LOWER(TC.tc_id) LIKE LOWER(@id)`;
                    params.push({ name: 'id', type: sql.Int, value: filters.id });
                }
                if (filters.nombre) {
                    query += ` AND LOWER(TC.tc_nombre) LIKE LOWER(@nombre)`;
                    params.push({ name: 'nombre', type: sql.NVarChar, value: `%${filters.nombre}%` });
                }
                if (filters.estado) {
                    query += ` AND LOWER(TC.tc_estado) LIKE LOWER(@estado)`;
                    params.push({ name: 'estado', type: sql.NVarChar, value: filters.estado });
                }
        
                // Preparar y ejecutar la consulta con los parámetros
                const request = connection.request();
                params.forEach(param => request.input(param.name, param.type, param.value));
                const result = await request.query(query);

                return result.recordset;
        
            } catch (err) {
                console.error('Error al obtener los colaboradores:', err.message);
                throw new Error('Error al obtener los colaboradores');
            }
        }

        static async getAllTipoNovedades(filters={}){
            try {
                let query = `
                    SELECT 
                    TN.tn_id AS id,
                    TN.tn_nombre AS nombre,
                    TN.tn_estado AS estado
                    FROM tipo_novedad TN
                    WHERE 1=1
                `;
        
                const params = [];
        
                // Agregar condiciones dinámicas basadas en los filtros
                if (filters.id) {
                    query += ` AND LOWER(TN.tn_id) LIKE LOWER(@id)`;
                    params.push({ name: 'id', type: sql.Int, value: filters.id });
                }
                if (filters.nombre) {
                    query += ` AND LOWER(TN.tn_nombre) LIKE LOWER(@nombre)`;
                    params.push({ name: 'nombre', type: sql.NVarChar, value: `%${filters.nombre}%` });
                }
                if (filters.estado) {
                    query += ` AND LOWER(TN.tn_estado) LIKE LOWER(@estado)`;
                    params.push({ name: 'estado', type: sql.NVarChar, value: filters.estado });
                }
        
                // Preparar y ejecutar la consulta con los parámetros
                const request = connection.request();
                params.forEach(param => request.input(param.name, param.type, param.value));
                const result = await request.query(query);

                return result.recordset;
        
            } catch (err) {
                console.error('Error al obtener los colaboradores:', err.message);
                throw new Error('Error al obtener los colaboradores');
            }
        }
        

        static async saveReports({ reportData, fileData }) {
            try {
                console.log('Entrando a saveReport');
                console.log('Datos del reporte:', reportData);
                console.log('Datos del archivo:', fileData);
                console.log(reportData.fecha_envio_doc);
                
                
                const fields = [];
                const values = [];
                const parameters = {};
        
                let index = 1; // Índice para asegurar nombres únicos en los parámetros
        
                if (reportData.col_id_solicita) {
                    console.log('col_id_solicita', reportData.col_id_solicita);
                    fields.push('rep_col_id_solicita');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.col_id_solicita;
                    index++;
                }
        
                if (reportData.col_jefe_inmediato) {
                    console.log('col_jefe_inmediato', reportData.col_jefe_inmediato);
                    fields.push('rep_col_jefe_inmediato');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.col_jefe_inmediato;
                    index++;
                }
        
                if (reportData.tipo_reporte) {
                    console.log('tipo_reporte', reportData.tipo_reporte);
                    fields.push('rep_tipo_reporte');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.tipo_reporte;
                    index++;
                }
                
                if (reportData.detalle_reporte) {
                    console.log('detalle_reporte', reportData.detalle_reporte);
                    fields.push('rep_detalle_reporte');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.detalle_reporte;
                    index++;
                }

                if (reportData.tipo_salida) {
                    console.log('tipo_salida', reportData.tipo_salida);
                    fields.push('rep_tipo_salida');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.tipo_salida;
                    index++;
                }

                if (reportData.motivo_salida) {
                    console.log('motivo_salida', reportData.motivo_salida);
                    fields.push('rep_motivo_salida');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.motivo_salida;
                    index++;
                }

                if (reportData.tipo_novedad) {
                    console.log('tipo_novedad', reportData.tipo_novedad);
                    fields.push('rep_tipo_novedad');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.tipo_novedad;
                    index++;
                }

                if (reportData.tipo_carta) {
                    console.log('tipo_carta', reportData.tipo_carta);
                    fields.push('rep_tipo_carta');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.tipo_carta;
                    index++;
                }


                if (reportData.pais_solicita) {
                    console.log('pais_solicita', reportData.pais_solicita);
                    fields.push('rep_pais_solicita');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.pais_solicita;
                    index++;
                }

                if (reportData.fecha_inicio) {
                    console.log('fecha_inicio', reportData.fecha_inicio);
                    fields.push('rep_fec_inicio');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.fecha_inicio;
                    index++;
                }
        
                if (reportData.fecha_fin) {
                    console.log('fecha_fin', reportData.fecha_fin);
                    fields.push('rep_fec_fin');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.fecha_fin;
                    index++;
                }

                if (reportData.area_actual) {
                    console.log('area_actual', reportData.area_actual);
                    fields.push('rep_area_actual');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.area_actual;
                    index++;
                }

                if (reportData.area_traslado) {
                    console.log('area_traslado', reportData.area_traslado);
                    fields.push('rep_area_traslado');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.area_traslado;
                    index++;
                }
        
                if (reportData.fecha_envio_doc) {
                    console.log('fecha_envio_doc', reportData.fecha_envio_doc);
                    fields.push('rep_fec_envio_doc');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.fecha_envio_doc;
                    index++;
                }
        
                if (reportData.otro) {
                    console.log('otro', reportData.otro);
                    fields.push('rep_otro');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.otro;
                    index++;
                }

                if (reportData.email_envio) {
                    console.log('email_envio', reportData.email_envio);
                    fields.push('rep_email_envio');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.email_envio;
                    index++;
                }
                
                if (reportData.estado) {
                    console.log('estado', reportData.estado);
                    fields.push('rep_estado');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.estado;
                    index++;
                }

                fields.push('rep_fecha_transaccion');
                values.push(`GETDATE()`);                
                
                if (fields.length === 0) {
                    throw new Error('No hay datos válidos para guardar el reporte');
                }
        
                const query = `
                    INSERT INTO reporte (${fields.join(', ')})
                    VALUES (${values.join(', ')});
                    SELECT SCOPE_IDENTITY() AS newReportId;
                `;
        
                console.log('Query:', query);
        
                const result = await connection.request();
                
                // Asignar los parámetros de forma dinámica
                Object.keys(parameters).forEach((paramKey) => {
                    result.input(paramKey, parameters[paramKey]);
                    console.log('Parámetro:', paramKey, parameters[paramKey]);
                });
        
                const insertResult = await result.query(query);
                const newReportId = insertResult.recordset[0].newReportId;
                
                console.log( 'insertResult', insertResult);
                console.log('ID del nuevo reporte guardado:', newReportId);
        
                // Insertar el documento si existe
                if (fileData) {
                    const documentQuery = `
                        INSERT INTO reporte_documento (rd_id_reporte, rd_id_tipo_documento, rd_documento, rd_nombre_documento, rd_fecha_documento)
                        VALUES (@reportId, @docType, @docContent, @docName, @docDate);
                    `;
        
                    await connection.request()
                        .input('reportId', sql.Int, newReportId)
                        .input('docType', sql.Int, fileData.docType)
                        .input('docContent', sql.VarBinary, fileData.content)
                        .input('docName', sql.VarChar, fileData.name)
                        .input('docDate', sql.DateTime, fileData.date)
                        .query(documentQuery);
                }
                
                //return { success: true, message: 'Reporte guardado exitosamente', reportId: newReportId };
                return { success: true, message: 'Reporte guardado exitosamente'};
            } catch (err) {
                console.error('Error al guardar el reporte:', err.message);
                throw new Error('Error al guardar el reporte');
            }
        }        

        static async updateVacationStatus({ id, estado }) {
            try {
                const query = `
                    UPDATE reporte
                    SET rep_estado = @estado
                    WHERE rep_id = @id
                `;
        
                const request = connection.request();
                request.input('id', sql.Int, id);
                request.input('estado', sql.VarChar(1), estado); // 'S', 'P', 'A', 'D'
        
                const result = await request.query(query);
        
                return result.rowsAffected > 0
                    ? { success: true, message: 'Estado actualizado exitosamente' }
                    : { success: false, message: 'No se encontró el registro o no se pudo actualizar' };
            } catch (err) {
                console.error('Error al actualizar el estado del pendiente:', err.message);
                throw new Error('Error al actualizar el estado del pendiente');
            }
        }       
        
        static async getHistoricoVacaciones() {
            try {
                const query = `
                SELECT 
                    C.col_identificacion as identificacion,
                    CONCAT(C.col_nombre, ' ', C.col_segundo_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS solicitante,
                    CONCAT(C2.col_nombre, ' ', C2.col_segundo_nombre,' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS jefe,
                    CONVERT (varchar(10), R.rep_fec_inicio, 103) AS fecha_inicio,
                    CONVERT (varchar(10), R.rep_fec_fin, 103) AS fecha_fin,
                    R.rep_detalle_reporte as detalle_reporte,
                    CONVERT (varchar(10), R.rep_fec_envio_doc, 103) AS fecha_envio_doc,
                    R.rep_estado as estado,
                    RD.rd_nombre_documento as nombre_documento,
                    RD.rd_documento as documento
                FROM reporte_documento RD
                RIGHT JOIN reporte R ON RD.rd_id_reporte = R.rep_id
                INNER JOIN colaborador C ON R.rep_col_id_solicita = C.col_id
                INNER JOIN colaborador C2 ON R.rep_col_jefe_inmediato = C2.col_id
                `;
                const request = connection.request();
                const result = await request.query(query);

                return result.recordset;
            } catch (err) {
                console.error('Error al obtener el historico de las vacaciones:', err.message);
                throw new Error('Error al obtener el historico de las vacaciones');
            }
        }

        static async getVacacionesReports(filters={}) {
            try {
                let query = `
                    SELECT 
                        R.rep_id as id,
                        CONCAT(C.col_nombre, ' ', C.col_segundo_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS nombreSolicitante,
                        R.rep_fec_inicio as fecha_inicio,
                        R.rep_fec_fin as fecha_fin,
                        R.rep_detalle_reporte as detalle_reporte,
                        R.rep_estado as estado
                    FROM reporte R
                    INNER JOIN colaborador C ON R.rep_col_id_solicita = C.col_id
                    INNER JOIN colaborador C2 ON R.rep_col_jefe_inmediato = C2.col_id
                    WHERE R.rep_tipo_reporte = 2
                    `;
                    
                const request = connection.request();
                
                if (filters.col_jefe_inmediato) {
                    query += `AND R.rep_col_jefe_inmediato = @col_jefe_inmediato `;
                    request.input('col_jefe_inmediato', sql.UniqueIdentifier, filters.col_jefe_inmediato);
                }

                if (filters.estado) {
                    query += ` AND R.rep_estado = @estado`;
                    request.input('estado', sql.NVarChar, filters.estado);
                }

                const result = await request.query(query);

                return result.recordset;
            } catch (error) {
                console.error('Error al obtener los colaboradores:', error.message);
                throw new Error('Error al obtener los colaboradores');
            }
        }

    }