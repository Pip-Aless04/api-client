
    import sql from 'mssql';
    import { connection } from "../db/db_connection.js";

    export class ReportesModel{

        static async getAllReports(filters) {
            try {
                console.log(filters);
                
                let query = `
                    SELECT 
                        R.rep_id AS id,
                        R.rep_col_id_solicita AS col_id_solicita,
                        R.rep_col_id_aplica AS col_emisor,
                        R.rep_tipo_reporte_id AS tipo_reporte,
                        R.rep_detalle_reporte AS detalle_reporte,
                        R.rep_sp_tipo_salida AS tipo_salida,
                        R.rep_sp_motivo_salida AS motivo_salida,
                        R.rep_il_tipo_novedad AS tipo_novedad,
                        R.rep_ca_tipo_carta AS tipo_carta,
                        R.rep_pais_solicita AS pais_solicita,
                        R.rep_fec_inicio AS fecha_inicio,
                        R.rep_fec_fin AS fecha_fin,
                        R.rep_tp_depto_actual AS area_actual,
                        R.rep_tp_depto_traslado AS area_traslado,
                        R.rep_fec_envio_doc AS fecha_envio_doc,
                        R.rep_otro AS otro,
                        R.rep_ca_email_envio AS email_envio,
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
        
                if (filters.col_emisor) {
                    query += ` AND R.rep_col_id_aplica = @col_emisor`;
                    request.input('col_emisor', sql.UniqueIdentifier, filters.col_emisor);
                }
        
                if (filters.tipo_reporte) {
                    query += ` AND R.rep_tipo_reporte_id = @tipo_reporte`;
                    request.input('tipo_reporte', sql.Int, filters.tipo_reporte);
                }
        
                if (filters.tipo_salida) {
                    query += ` AND R.rep_sp_tipo_salida = @tipo_salida`;
                    request.input('tipo_salida', sql.Int, filters.tipo_salida);
                }
        
                if (filters.motivo_salida) {
                    query += ` AND R.rep_sp_motivo_salida = @motivo_salida`;
                    request.input('motivo_salida', sql.Int, filters.motivo_salida);
                }
        
                if (filters.tipo_novedad) {
                    query += ` AND R.rep_il_tipo_novedad = @tipo_novedad`;
                    request.input('tipo_novedad', sql.Int, filters.tipo_novedad);
                }
        
                if (filters.tipo_carta) {
                    query += ` AND R.rep_ca_tipo_carta = @tipo_carta`;
                    request.input('tipo_carta', sql.Int, filters.tipo_carta);
                }
        
                if (filters.pais_solicita) {
                    query += ` AND R.rep_pais_solicita = @pais_solicita`;
                    request.input('pais_solicita', sql.Int, filters.pais_solicita);
                }
        
                if (filters.fecha_inicio) {
                    query += ` AND R.rep_fec_inicio = @fecha_inicio`;
                    request.input('fecha_inicio', sql.Date, filters.fecha_inicio);
                }                
        
                if (filters.fecha_fin) {
                    query += ` AND R.rep_fec_fin = @fecha_fin`;
                    request.input('fecha_fin', sql.Date, filters.fecha_fin);
                }
        
                if (filters.area_actual) {
                    query += ` AND R.rep_tp_depto_actual = @area_actual`;
                    request.input('area_actual', sql.Int, filters.area_actual);
                }   
        
                if (filters.area_traslado) {
                    query += ` AND R.rep_tp_depto_traslado = @area_traslado`;
                    request.input('area_traslado', sql.Int, filters.area_traslado);
                }
        
                if (filters.fecha_envio_doc) {
                    query += ` AND R.rep_fec_envio_doc = @fecha_envio_doc`;
                    request.input('fecha_envio_doc', sql.Date, filters.fecha_envio_doc);
                }                
        
                if (filters.otro) {
                    query += ` AND R.rep_otro = @otro`;
                    request.input('otro', sql.NVarChar, filters.otro);
                }
        
                if (filters.email_envio) {
                    query += ` AND R.rep_ca_email_envio = @email_envio`;
                    request.input('email_envio', sql.VarChar, filters.email_envio);
                }
                
                if (filters.estado) {
                    query += ` AND R.rep_estado = @estado`;
                    request.input('estado', sql.Char, filters.estado);
                }
                
                console.log(query);
                const result = await request.query(query);
        
                return result.recordset;
            } catch (error) {
                console.error('Error obteniendo todos los reportes:', error.message);
                return { success: false, error: 'Error obteniendo todos los reportes' };
            }
        }
        
        static async getAllReportsTable(filters) {
            try {
                console.log(filters);
                
                let query = `
                    SELECT 
                        R.rep_id AS id,
                        R.rep_col_id_solicita AS col_id_solicita,
                        R.rep_col_id_aplica AS col_emisor,
                        R.rep_tipo_reporte_id AS tipo_reporte,
                        R.rep_detalle_reporte AS detalle_reporte,
                        R.rep_sp_tipo_salida AS tipo_salida,
                        R.rep_sp_motivo_salida AS motivo_salida,
                        R.rep_il_tipo_novedad AS tipo_novedad,
                        R.rep_ca_tipo_carta AS tipo_carta,
                        R.rep_pais_solicita AS pais_solicita,
                        R.rep_fec_inicio AS fecha_inicio,
                        R.rep_fec_fin AS fecha_fin,
                        R.rep_tp_depto_actual AS area_actual,
                        R.rep_tp_depto_traslado AS area_traslado,
                        R.rep_fec_envio_doc AS fecha_envio_doc,
                        R.rep_otro AS otro,
                        R.rep_ca_email_envio AS email_envio,
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
        
                if (filters.col_emisor) {
                    query += ` AND R.rep_col_id_aplica = @col_emisor`;
                    request.input('col_emisor', sql.UniqueIdentifier, filters.col_emisor);
                }
        
                if (filters.tipo_reporte) {
                    query += ` AND R.rep_tipo_reporte_id = @tipo_reporte`;
                    request.input('tipo_reporte', sql.Int, filters.tipo_reporte);
                }
        
                if (filters.tipo_salida) {
                    query += ` AND R.rep_sp_tipo_salida = @tipo_salida`;
                    request.input('tipo_salida', sql.Int, filters.tipo_salida);
                }
        
                if (filters.motivo_salida) {
                    query += ` AND R.rep_sp_motivo_salida = @motivo_salida`;
                    request.input('motivo_salida', sql.Int, filters.motivo_salida);
                }
        
                if (filters.tipo_novedad) {
                    query += ` AND R.rep_il_tipo_novedad = @tipo_novedad`;
                    request.input('tipo_novedad', sql.Int, filters.tipo_novedad);
                }
        
                if (filters.tipo_carta) {
                    query += ` AND R.rep_ca_tipo_carta = @tipo_carta`;
                    request.input('tipo_carta', sql.Int, filters.tipo_carta);
                }
        
                if (filters.pais_solicita) {
                    query += ` AND R.rep_pais_solicita = @pais_solicita`;
                    request.input('pais_solicita', sql.Int, filters.pais_solicita);
                }
        
                if (filters.fecha_inicio) {
                    query += ` AND R.rep_fec_inicio = @fecha_inicio`;
                    request.input('fecha_inicio', sql.Date, filters.fecha_inicio);
                }                
        
                if (filters.fecha_fin) {
                    query += ` AND R.rep_fec_fin = @fecha_fin`;
                    request.input('fecha_fin', sql.Date, filters.fecha_fin);
                }
        
                if (filters.area_actual) {
                    query += ` AND R.rep_tp_depto_actual = @area_actual`;
                    request.input('area_actual', sql.Int, filters.area_actual);
                }   
        
                if (filters.area_traslado) {
                    query += ` AND R.rep_tp_depto_traslado = @area_traslado`;
                    request.input('area_traslado', sql.Int, filters.area_traslado);
                }
        
                if (filters.fecha_envio_doc) {
                    query += ` AND R.rep_fec_envio_doc = @fecha_envio_doc`;
                    request.input('fecha_envio_doc', sql.Date, filters.fecha_envio_doc);
                }                
        
                if (filters.otro) {
                    query += ` AND R.rep_otro = @otro`;
                    request.input('otro', sql.NVarChar, filters.otro);
                }
        
                if (filters.email_envio) {
                    query += ` AND R.rep_ca_email_envio = @email_envio`;
                    request.input('email_envio', sql.VarChar, filters.email_envio);
                }
                
                if (filters.estado) {
                    query += ` AND R.rep_estado = @estado`;
                    request.input('estado', sql.Char, filters.estado);
                }
                
                console.log(query);
                const result = await request.query(query);
        
                return result.recordset;
            } catch (error) {
                console.error('Error obteniendo todos los reportes:', error.message);
                return { success: false, error: 'Error obteniendo todos los reportes' };
            }
        }


        static async getAllTipoReporte (filters={}) {
            try {
                let query = `
                    SELECT 
                    TR.tr_id AS id,
                    REPLACE(TR.tr_nombre, '_', ' ') AS nombre,
                    TR.tr_estado AS estado
                    FROM tipo_reporte TR
                    WHERE 1=1
                `;
        
                const params = [];
        
                // Agregar condiciones dinámicas basadas en los filtros
                if (filters.id) {
                    query += ` AND LOWER(TR.tr_id) LIKE LOWER(@id)`;
                    params.push({ name: 'id', type: sql.Int, value: filters.id });
                }
                if (filters.nombre) {
                    query += ` AND LOWER(TR.tr_nombre) LIKE LOWER(@nombre)`;
                    params.push({ name: 'nombre', type: sql.NVarChar, value: `%${filters.nombre}%` });
                }
                if (filters.estado) {
                    query += ` AND LOWER(TR.tr_estado) LIKE LOWER(@estado)`;
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
        
        static async getAllPais(filters={}){
            try {
                let query = `
                    SELECT 
                    pais_id AS id,
                    pais_nombre AS nombre,
                    pais_acronimo AS acronimo,
                    pais_estado AS estado
                    FROM pais
                    WHERE 1=1
                `;
        
                const params = [];  
        
                // Agregar condiciones dinámicas basadas en los filtros
                if (filters.id) {
                    query += ` AND LOWER(pais_id) LIKE LOWER(@id)`;
                    params.push({ name: 'id', type: sql.Int, value: filters.id });
                }
                if (filters.nombre) {
                    query += ` AND LOWER(pais_nombre) LIKE LOWER(@nombre)`;
                    params.push({ name: 'nombre', type: sql.NVarChar, value: `%${filters.nombre}%` });
                }
                if (filters.acrónimo) {
                    query += ` AND LOWER(pais_acronimo) LIKE LOWER(@acronimo)`;
                    params.push({ name: 'acronimo', type: sql.NVarChar, value: `%${filters.acrónimo}%` });
                }
                if (filters.estado) {
                    query += ` AND LOWER(pais_estado) LIKE LOWER(@estado)`;
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
        
        static async getAllSubordinados(filters={}){
            try {
                let query = `
                    SELECT 
                        C.col_id AS id,
                        C.col_nombre AS nombre,
                        C.col_segundo_nombre AS segundo_nombre,
                        C.col_primer_apellido AS primer_apellido,
                        C.col_segundo_apellido AS segundo_apellido,
                        C.col_puesto_id AS puesto,
                        C.col_email AS email,
                        C.col_estado AS estado,
                        C.col_depto_id AS depto,
                        C.col_direccion_id AS dir,
                        C.col_jefatura_id AS jefe_id
                    FROM colaborador C
                    INNER JOIN puesto PUE
                    ON C.col_puesto_id = PUE.pue_id
                    INNER JOIN departamento DEP
                    ON C.col_depto_id = DEP.depto_id
                    INNER JOIN direccion DIR
                    ON C.col_direccion_id = DIR.dir_id
                    INNER JOIN colaborador C2
                    ON C.col_jefatura_id = C2.col_id
                    WHERE 1=1`;
        
                const request = connection.request();
        
                // Validación de filtros y parametrización segura
                if (filters.id) {
                    query += `AND LOWER(C.col_id) LIKE LOWER(@id)`;
                    request.input('id', sql.Int, filters.id);
                }            
                
                if (filters.jefe_id) {
                    query += `AND LOWER(C.col_jefatura_id) LIKE LOWER(@col_jefatura_id)`;
                    request.input('col_jefatura_id', sql.UniqueIdentifier, filters.jefe_id);
                }
        
                if (filters.estado) {
                    query += `AND LOWER(C.col_estado) LIKE LOWER(@estado)`;
                    request.input('estado', sql.NVarChar, filters.estado);
                }
                
                if (filters.depto) { 
                    query += `AND C.col_depto_id) = @depto`;
                    request.input('depto', sql.Int, filters.depto);
                }
                
                if (filters.dir) { 
                    query += `AND C.col_direccion_id = @dir`;
                    request.input('dir', sql.Int, filters.dir);
                }

                console.log({query});
                const result = await request.query(query);
        
                return result.recordset;
            } catch (error) {
                console.error('Error obteniendo todos los reportes:', error.message);
                return { success: false, error: 'Error obteniendo todos los reportes' };
            }
        }

        static async saveReports({ reportData, fileData }) {
            try {

                if (!reportData || typeof reportData !== 'object') {
                    throw new Error('reportData no es válido.');
                }
                if (!Array.isArray(fileData)) {
                    throw new Error('fileData debe ser un arreglo.');
                }
                
                console.log('Entrando a saveReports model');
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
            
                if (reportData.col_id_aplica) {
                    console.log('col_id_aplica', reportData.col_id_aplica);
                    fields.push('rep_col_id_aplica');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.col_id_aplica;
                    index++;
                }
            
                if (reportData.tipo_salida) {
                    console.log('tipo_salida', reportData.tipo_salida);
                    fields.push('rep_sp_tipo_salida');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.tipo_salida;
                    index++;
                }
        
                if (reportData.motivo_salida) {
                    console.log('motivo_salida', reportData.motivo_salida);
                    fields.push('rep_sp_motivo_salida');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.motivo_salida;
                    index++;
                }
        
                if (reportData.saldo_vacaciones) {
                    console.log('saldo_vacaciones', reportData.saldo_vacaciones);
                    fields.push('rep_sp_saldo_vacaciones');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.saldo_vacaciones;
                    index++;
                }
        
                if (reportData.motivo_traslado) {
                    console.log('motivo_traslado', reportData.motivo_traslado);
                    fields.push('rep_tp_motivo_traslado');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.motivo_traslado;
                    index++;
                }
        
                if (reportData.depto_traslado) {
                    console.log('depto_traslado', reportData.depto_traslado);
                    fields.push('rep_tp_depto_traslado');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.depto_traslado;
                    index++;
                
                    // Realizar el SELECT para obtener el departamento actual
                    const deptoQuery = `
                        SELECT col_depto_id 
                        FROM colaborador 
                        WHERE col_id = @colId;
                    `;
                    
                    const deptoResult = await connection.request()
                        .input('colId', sql.UniqueIdentifier, reportData.col_id_aplica) // Usar col_id_aplica para filtrar
                        .query(deptoQuery);
                
                    if (deptoResult.recordset.length > 0) {
                        const deptoActual = deptoResult.recordset[0].col_depto_id;
                
                        console.log('depto_actual', deptoActual);
                        fields.push('rep_tp_depto_actual'); // Agregar la columna al INSERT
                        values.push(`@param${index}`); // Agregar el placeholder
                        parameters[`param${index}`] = deptoActual; // Agregar el valor a los parámetros
                        index++;
                    } else {
                        console.error(`No se encontró el departamento actual para col_id_aplica: ${reportData.col_id_aplica}`);
                        throw new Error('No se puede determinar el departamento actual del colaborador');
                    }
                }                
        
                if (reportData.tipo_novedad) {
                    console.log('tipo_novedad', reportData.tipo_novedad);
                    fields.push('rep_il_tipo_novedad');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.tipo_novedad;
                    index++;
                }
        
                if (reportData.tipo_carta) {
                    console.log('tipo_carta', reportData.tipo_carta);
                    fields.push('rep_ca_tipo_carta');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.tipo_carta;
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
                    fields.push('rep_ca_email_envio');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.email_envio;
                    index++;
                }
        
                if (reportData.detalle_reporte) {
                    console.log('detalle_reporte', reportData.detalle_reporte);
                    fields.push('rep_detalle_reporte');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.detalle_reporte;
                    index++;
                }
        
                if (reportData.tipo_reporte) {
                    console.log('tipo_reporte', reportData.tipo_reporte);
                    fields.push('rep_tipo_reporte_id');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.tipo_reporte;
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
        
                if (reportData.fecha_envio_doc) {
                    console.log('fecha_envio_doc', reportData.fecha_envio_doc);
                    fields.push('rep_fec_envio_doc');
                    values.push(`@param${index}`);
                    parameters[`param${index}`] = reportData.fecha_envio_doc;
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
                
                console.log('insertResult', insertResult);
                console.log('ID del nuevo reporte guardado:', newReportId);
                
                console.log({fileData});
                console.log({fileDataLength: fileData.length});
                // Insertar los documentos
                if (fileData && fileData.length > 0) {
                    console.log('entro al if del fileData en el model');
                    for (let i = 0; i < fileData.length; i++) {
                        try {
                            const documentQuery = `
                                INSERT INTO reporte_documento (rd_id_reporte, rd_id_tipo_documento, rd_documento, rd_nombre_documento, rd_extension_documento, rd_fecha_documento)
                                VALUES (@reportId, @docType, @docContent, @docName, @docExtension, @docDate);
                            `;
                
                            // Convierte el contenido si es base64
                            let docContent;

                            if (typeof fileData[i].content === 'string' && fileData[i].content.startsWith('data:')) {
                                // Si es un string Base64
                                docContent = Buffer.from(fileData[i].content.split(',')[1], 'base64');
                            } else if (Buffer.isBuffer(fileData[i].content)) {
                                // Si ya es un buffer
                                docContent = fileData[i].content;
                            } else {
                                // Manejo de error: el formato no es válido
                                console.error(`Formato no válido para fileData[${i}].content`);
                                throw new Error(`Formato no válido para el contenido del archivo ${fileData[i].name}`);
                            }
                            
                            console.log(`Tipo de fileData[${i}].content:`, typeof fileData[i].content);
                            console.log({tipo_doc:reportData.tipo_documento[i], tipo_doc_type:fileData[i].docType});
                            
                            await connection.request()
                                .input('reportId', sql.Int, newReportId)
                                .input('docType', sql.Int, reportData.tipo_documento[i] ? reportData.tipo_documento[i] : fileData[i].docType)  // El tipo de documento
                                .input('docContent', sql.VarBinary, docContent)  // Contenido del archivo
                                .input('docName', sql.VarChar, fileData[i].name)           // Nombre del archivo
                                .input('docExtension', sql.VarChar, fileData[i].extension) // Extensión del archivo
                                .input('docDate', sql.DateTime, fileData[i].date || new Date())  // Fecha del archivo
                                .query(documentQuery);
                            
                        } catch (error) {
                            console.error(`Error al insertar documento ${i + 1}:`, error.message);
                            // Si deseas continuar insertando otros archivos, puedes continuar el loop
                        }
                    }
                }
                
                return { success: true, message: 'Reporte guardado exitosamente' };
            } catch (err) {
                await this.logError({errorMessage: `Error en el catch del model save report: ${err.message}`});
                console.error('Error al guardar el reporte:', err.message);
                throw new Error(`Error al guardar el reporte: ${err.message}`);
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
                request.input('estado', sql.Char(1), estado); // 'S', 'P', 'A', 'D'
        
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
                        C.col_identificacion AS identificacion,
                        CONCAT(C.col_nombre, ' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS subordinado,
                        C.col_email AS email,
                        D.depto_nombre AS departamento,
                        CONCAT(C2.col_nombre, ' ', C2.col_segundo_nombre, ' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS jefe,
                        FORMAT(R.rep_fec_inicio, 'dd/MM/yyyy') AS fecha_inicio,
                        FORMAT(R.rep_fec_fin, 'dd/MM/yyyy') AS fecha_fin,
                        R.rep_detalle_reporte AS detalle_reporte,
                        CASE 
                            WHEN R.rep_estado = 'S' THEN 'Solicitado'
                            WHEN R.rep_estado = 'P' THEN 'Pendiente'
                            WHEN R.rep_estado = 'A' THEN 'Aceptado'
                            WHEN R.rep_estado = 'D' THEN 'Rechazado'
                        END AS estado,
                        CASE
                            WHEN R.rep_fec_envio_doc IS NULL THEN '-'
                            ELSE FORMAT(R.rep_fec_envio_doc, 'dd/MM/yyyy') -- Formateo opcional, depende de tu necesidad
                        END AS fecha_envio_documento,
                        RD.rd_id AS documento_id,
                        RD.rd_nombre_documento AS nombre_documento
                    FROM reporte_documento RD 
                    INNER JOIN reporte R ON RD.rd_id_reporte = R.rep_id
                    INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
                    INNER JOIN colaborador C2 ON C.col_jefatura_id = C2.col_id 
                    INNER JOIN departamento D ON C.col_depto_id = D.depto_id
                    WHERE R.rep_tipo_reporte_id = 2
                `;
                const request = connection.request();
                const result = await request.query(query);
        
                return result.recordset;
            } catch (err) {
                console.error('Error al obtener el histórico de las vacaciones:', err.message);
                throw new Error('Error al obtener el histórico de las vacaciones');
            }
        }
        
        static async getHistoricoSalidas() {
            try {
                const query = `
                        SELECT 
                            C.col_identificacion AS identificacion,
                            CONCAT(C.col_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS colaborador,
                            C.col_email AS email,
                            PA.pais_acronimo AS pais,
                            D.depto_nombre AS departamento,
                            CONCAT(C2.col_nombre,' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS encargado_reporte,
                            PU.pue_nombre AS puesto,
                            FORMAT(R.rep_fec_fin, 'dd-MM-yyyy') AS fecha_salida,
                            TS.ts_nombre AS tipo_salida,
                            CASE 
                                WHEN MS.ms_id = 14 THEN R.rep_otro
                                ELSE MS.ms_nombre
                            END AS motivo_salida,
                            (
                                SELECT 
                                    RD.rd_id AS documento_id,
                                    RD.rd_nombre_documento AS nombre_documento
                                FROM reporte_documento RD
                                WHERE RD.rd_id_reporte = R.rep_id
                                FOR JSON PATH
                            ) AS documentos
                        FROM reporte R
                        INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
                        INNER JOIN colaborador C2 ON R.rep_col_id_solicita = C2.col_id
                        INNER JOIN pais PA ON R.rep_pais_solicita = PA.pais_id
                        INNER JOIN departamento D ON C.col_depto_id = D.depto_id
                        INNER JOIN puesto PU ON C.col_puesto_id = PU.pue_id
                        INNER JOIN tipo_salida TS ON R.rep_sp_tipo_salida = TS.ts_id
                        INNER JOIN motivo_salida MS ON R.rep_sp_motivo_salida = MS.ms_id
                        WHERE R.rep_tipo_reporte_id = 1
                        GROUP BY 
                            R.rep_id,
                            C.col_identificacion,
                            C.col_nombre, C.col_primer_apellido, C.col_segundo_apellido,
                            C.col_email,
                            PA.pais_acronimo,
                            D.depto_nombre,
                            C2.col_nombre, C2.col_primer_apellido, C2.col_segundo_apellido,
                            PU.pue_nombre,
                            R.rep_fec_fin,
                            TS.ts_nombre,
                            MS.ms_id, R.rep_otro, MS.ms_nombre
                `;
                const request = connection.request();
                const result = await request.query(query);
        
                // Parsear el campo 'documentos' antes de devolverlo
                result.recordset.forEach(item => {
                    item.documentos = JSON.parse(item.documentos);
                });
                
                console.log(result.recordset);

                return result.recordset;
            } catch (error) {
                console.error('Error al obtener el histórico de las salidas:', error.message);
                throw new Error('Error al obtener el histórico de las salidas');
            }
        }   
        
        static async getHistoricoTraslados() {
            try {
                const query = `
                    SELECT 
                        C.col_identificacion AS identificacion,
                        CONCAT(C.col_nombre,' ',C.col_primer_apellido,' ', C.col_segundo_apellido) AS colaborador,
                        C.col_email AS email,
                        CONCAT(C2.col_nombre,' ',C2.col_primer_apellido,' ', C2.col_segundo_apellido) AS encargado_reporte,
                        R.rep_fec_inicio AS fecha_traslado,
                        R.rep_tp_motivo_traslado AS motivo_traslado,
                        D.depto_nombre AS departamento_actual,
                        D2.depto_nombre AS departamento_traslado,
                        FORMAT(R.rep_fec_envio_doc, 'dd/mm/yyyy') AS fecha_envio_documento,
                        RD.rd_id AS documento_id,
                        RD.rd_nombre_documento AS nombre_documento
                    FROM reporte_documento RD 
                    INNER JOIN reporte R ON RD.rd_id_reporte = R.rep_id
                    INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
                    INNER JOIN colaborador C2 ON C.col_jefatura_id = C2.col_id 
                    INNER JOIN departamento D ON R.rep_tp_depto_actual = D.depto_id
                    INNER JOIN departamento D2 ON R.rep_tp_depto_traslado = D2.depto_id
                    WHERE R.rep_tipo_reporte_id = 3
                `;
                const request = connection.request();
                const result = await request.query(query);
        
                return result.recordset;
            } catch (err) {
                console.error('Error al obtener el histórico de traslados:', err.message);
                throw new Error('Error al obtener el histórico de los traslados');
            }
        }        

        static async getHistoricoCartas() {
            try {
                const query = `
                    SELECT 
                        C.col_identificacion,
                        CONCAT(C.col_nombre,' ',C.col_primer_apellido,' ', C.col_segundo_apellido) AS colaborador,
                        C.col_email AS email,
                        D.depto_nombre AS departamento,
                        TC.tc_nombre AS tipo_carta,
                        CASE
                            WHEN R.rep_detalle_reporte IS NOT NULL THEN R.rep_detalle_reporte
                            ELSE '-'
                        END AS detalle_reporte,
                        R.rep_ca_email_envio AS email_envio,
                        RD.rd_id AS documento_id,
                        RD.rd_nombre_documento AS nombre_documento
                    FROM reporte_documento RD 
                    INNER JOIN reporte R ON RD.rd_id_reporte = R.rep_id
                    INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
                    INNER JOIN departamento D ON C.col_depto_id = D.depto_id
                    INNER JOIN tipo_carta TC ON R.rep_ca_tipo_carta = TC.tc_id
                    WHERE R.rep_tipo_reporte_id = 5
                `;
                const request = connection.request();
                const result = await request.query(query);
        
                return result.recordset;
            } catch (err) {
                console.error('Error al obtener el histórico de las vacaciones:', err.message);
                throw new Error('Error al obtener el histórico de las vacaciones');
            }
        }

        static async getHistoricoIncapacidades() {
            try {
                const query = `
                    SELECT 
                        C.col_identificacion AS identificacion,
                        CONCAT(C.col_nombre,' ',C.col_primer_apellido,' ', C.col_segundo_apellido) AS colaborador,
                        C.col_email AS email,
                        D.depto_nombre AS departamento,
                        TN.tn_nombre AS tipo_novedad,
                        FORMAT(R.rep_fec_inicio, 'dd/MM/yyyy') AS fecha_inicio,
                        FORMAT(R.rep_fec_fin, 'dd/MM/yyyy') AS fecha_fin,
                        RD.rd_id AS documento_id,
                        RD.rd_nombre_documento AS nombre_documento
                    FROM reporte_documento RD 
                    INNER JOIN reporte R ON RD.rd_id_reporte = R.rep_id
                    INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
                    INNER JOIN departamento D ON C.col_depto_id = D.depto_id
                    INNER JOIN tipo_novedad TN ON R.rep_il_tipo_novedad = TN.tn_id
                    WHERE R.rep_tipo_reporte_id = 4
                `;
                const request = connection.request();
                const result = await request.query(query);
        
                return result.recordset;
            } catch (err) {
                console.error('Error al obtener el histórico de las vacaciones:', err.message);
                throw new Error('Error al obtener el histórico de las vacaciones');
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
                    INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
                    WHERE R.rep_tipo_reporte_id = 2
                    `;
                    
                const request = connection.request();
                
                if (filters.jefe_id) {
                    query += `AND C.col_jefatura_id = @jefe_id `;
                    request.input('jefe_id', sql.UniqueIdentifier, filters.jefe_id);
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

        static async getFileReportById({id}) {
            try {
                let query = `
                    SELECT  
                        RD.rd_nombre_documento as nombre_documento,
                        RD.rd_documento as documento,
                        RD.rd_extension_documento as extension
                    FROM reporte_documento RD
                    WHERE RD.rd_id = @id
                `;

                const request = connection.request();
                request.input('id', sql.Int, id);
                const result = await request.query(query);

                return result.recordset;
            }
            catch (error) {
                console.error('Error al obtener el archivo:', error.message);
                throw new Error('Error al obtener el archivo');
            }
        }


        static async logError({errorMessage}) {
            try {
                console.log('Entrando a logError model');
                console.log('errorMessage:', errorMessage);
                
                const query = `
                    INSERT INTO error_log(el_error_message)
                    VALUES (@errorMessage);
                `;

                const request = connection.request();
                request.input('errorMessage', sql.NVarChar, errorMessage);
                const result = await request.query(query);

                return result.recordset;
            }
            catch (error) {
                console.error('Error al registrar el error:', error.message);
                throw new Error('Error al registrar el error');
            }
        }

        static async getPendingReports(filters = {}) {
            try {
                console.log({ filters });
        
                let query = `
                    SELECT 
                        R.rep_id AS id,
                        CONCAT(C.col_nombre, ' ', C.col_segundo_nombre, ' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS nombreSolicitante,
                        TR.tr_id AS tipo_reporte_id,
                        REPLACE(TR.tr_nombre, '_', ' ') AS tipo_reporte,
                        R.rep_fec_inicio AS fecha_inicio,
                        R.rep_fec_fin AS fecha_fin,
                        R.rep_detalle_reporte AS detalle_reporte,
                        R.rep_estado AS estado,
                        ISNULL(
                            (
                                SELECT 
                                    RD.rd_id AS documento_id,
                                    RD.rd_nombre_documento AS nombre_documento
                                FROM reporte_documento RD
                                WHERE RD.rd_id_reporte = R.rep_id
                                FOR JSON PATH
                            ), '[]'
                        ) AS documentos
                    FROM reporte R
                    INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
                    INNER JOIN tipo_reporte TR ON R.rep_tipo_reporte_id = TR.tr_id
                    WHERE 1 = 1
                `;
        
                const request = connection.request();
        
                // Filtros opcionales
                if (filters.jefe_id) {
                    query += ` AND C.col_jefatura_id = @jefe_id`;
                    request.input('jefe_id', sql.UniqueIdentifier, filters.jefe_id);
                }
        
                if (filters.estado) {
                    query += ` AND R.rep_estado = @estado`;
                    request.input('estado', sql.NVarChar, filters.estado);
                } else {
                    query += ` AND R.rep_estado = 'P'`;
                }
        
                if (filters.reporte) {
                    query += ` AND R.rep_tipo_reporte_id = @reporte`;
                    request.input('reporte', sql.Int, filters.reporte);
                }
        
                console.log(query);
        
                const result = await request.query(query);
        
                // Parsear los documentos si existen
                result.recordset.forEach(item => {
                    item.documentos = JSON.parse(item.documentos || '[]');
                });
        
                return result.recordset;
            } catch (error) {
                console.error('Error al obtener los reportes pendientes:', error.message);
                throw new Error('Error al obtener los reportes pendientes');
            }
        }        
}