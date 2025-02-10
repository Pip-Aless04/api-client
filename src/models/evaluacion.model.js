import sql from 'mssql';
import { connection } from "../db/db_connection.js";


export class EvaluacionModel{
    
    static async getAll(filters) {

        try {
            let query = `
                SELECT 
                    C.col_id AS id,
                    C.col_identificacion AS identificacion,
                    C.col_nombre AS nombre,
                    C.col_primer_apellido AS primer_apellido,
                    C.col_segundo_apellido AS segundo_apellido,
                    PUE.pue_nombre AS puesto,
                    C.col_email AS email,
                    C.col_estado AS estado,
                    DEP.depto_nombre AS departamento,
                    DIR.dir_nombre AS direccion,
                    PAIS.pais_acronimo AS pais,
                    C.col_personal_cargo AS a_cargo,
                    CONCAT(C2.col_nombre, ' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS nombre_jefe,
                    C.col_fecha_ingreso AS fecha_ingreso,
                    C.col_respuesta AS respuesta
                FROM colaborador C
                INNER JOIN puesto PUE ON C.col_puesto = PUE.pue_id
                INNER JOIN departamento DEP ON C.col_depto_pertenece = DEP.depto_id
                INNER JOIN direccion DIR ON C.col_dir_pertenece = DIR.dir_id
                INNER JOIN pais PAIS ON C.col_pais = PAIS.pais_id
                LEFT JOIN colaborador C2 ON C.col_jefe_id = C2.col_id
                WHERE 1=1
            `;
    
            const params = [];
    
            // Agregar condiciones dinámicas basadas en los filtros
            if (filters.ident) {
                query += ` AND LOWER(C.col_identificacion) LIKE LOWER(@ident)`;
                params.push({ name: 'ident', type: sql.NVarChar, value: filters.ident });
            }
            if (filters.name) {
                query += ` AND LOWER(C.col_nombre) LIKE LOWER(@name)`;
                params.push({ name: 'name', type: sql.NVarChar, value: `%${filters.name}%` });
            }
            if (filters.p_ape) {
                query += ` AND LOWER(C.col_primer_apellido) LIKE LOWER(@p_ape)`;
                params.push({ name: 'p_ape', type: sql.NVarChar, value: `%${filters.p_ape}%` });
            }
            if (filters.s_ape) {
                query += ` AND LOWER(C.col_segundo_apellido) LIKE LOWER(@s_ape)`;
                params.push({ name: 's_ape', type: sql.NVarChar, value: `%${filters.s_ape}%` });
            }
            if (filters.puesto) {
                query += ` AND LOWER(PUE.pue_id) LIKE LOWER(@puesto)`;
                params.push({ name: 'puesto', type: sql.NVarChar, value: `%${filters.puesto}%` });
            }
            if (filters.mail) {
                query += ` AND LOWER(C.col_email) LIKE LOWER(@mail)`;
                params.push({ name: 'mail', type: sql.NVarChar, value: `%${filters.mail}%` });
            }
            if (filters.estado) {
                query += ` AND LOWER(C.col_estado) LIKE LOWER(@estado)`;
                params.push({ name: 'estado', type: sql.NVarChar, value: filters.estado });
            }
            if (filters.depto) {
                query += ` AND LOWER(DEP.depto_id) LIKE @depto`;
                params.push({ name: 'depto', type: sql.NVarChar, value: filters.depto });
            }
            if (filters.dir) {
                query += ` AND LOWER(DIR.dir_nombre) LIKE @dir`;
                params.push({ name: 'dir', type: sql.NVarChar, value: filters.dir });
            }
            if (filters.pais) {
                query += ` AND LOWER(PAIS.pais_acronimo) LIKE LOWER(@pais)`;
                params.push({ name: 'pais', type: sql.NVarChar, value: `%${filters.pais}%` });
            }
            if (filters.a_cargo) {
                query += ` AND LOWER(C.col_personal_cargo) LIKE LOWER(@a_cargo)`;
                params.push({ name: 'a_cargo', type: sql.NVarChar, value: `%${filters.a_cargo}%` });
            }
            if (filters.jefe) {
                query += ` AND C.col_jefe_id LIKE LOWER(@jefe)`;
                params.push({ name: 'jefe', type: sql.UniqueIdentifier, value: filters.jefe });
            }
            if (filters.res) {
                query += ` AND LOWER(C.col_respuesta) LIKE LOWER(@res)`;
                params.push({ name: 'res', type: sql.NVarChar, value: `%${filters.res}%` });
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

    static async getHistoricoResumidoEvals({colId}) {
        try {
            
            const query = `SELECT 
                            E.ev_id AS eval_id,
                            TE.te_nombre AS nombre_evaluacion,
                            E.ev_categoria AS categoria,
                            E.ev_fecha AS fecha,
                            CASE
                                WHEN SUM(CASE WHEN C.cal_calificacion_subordinado IS NULL THEN 1 ELSE 0 END) > 0 THEN 0
                                ELSE 1
                            END AS calificaciones_subordinado,
                            CASE
                                WHEN SUM(CASE WHEN C.cal_calificacion_jefe IS NULL THEN 1 ELSE 0 END) > 0 THEN 0
                                ELSE 1
                            END AS calificaciones_jefe
                        FROM 
                            calificacion C
                        INNER JOIN 
                            evaluacion_detalle ED ON C.cal_detalle_eval = ED.evd_id
                        INNER JOIN 
                            evaluacion E ON ED.evd_evaluacion_id = E.ev_id
                        INNER JOIN 
                            tipo_evaluation TE ON E.ev_tipo_evaluation = TE.te_id
                        WHERE 
                            C.cal_col_subordinado = '612d9291-78c0-43d6-afa9-f0c964a8f90d'
                        GROUP BY 
                            E.ev_id, TE.te_nombre, E.ev_categoria, E.ev_fecha;
                        `;
            
            const request = connection.request();
            // Asegúrate de utilizar los parámetros correctamente
            const result = await request
                .input('colId', sql.UniqueIdentifier, colId)
                .query(query);

            return result.recordset;

        } catch (error) {
            console.error('Error al obtener el resumen de evaluaciones:', error.message);
            throw new Error('Error al obtener el resumen de evaluaciones');
        }
    }

    static async getEvalResultado ({colId, evalId}) {
        try {
            const query = `
                SELECT
                T.tal_nombre AS talento_nombre,
                DT.det_tal_texto AS talento_descripcion,
                ED.valor_talento AS valor_talento,
                ED.porcentaje_talento AS porcentaje_talento,
                ED.valor_detalle_talento AS valor_detalle_talento,
                N.nota_nombre AS nota_subordinado,
                N.nota_valor AS nota_subordinado_valor,
                N2.nota_nombre AS nota_jefe,
                N2.nota_valor AS nota_jefe_valor,
                FORMAT(ROUND((N2.nota_valor * 100 ), 2), 'N2') AS nota,
                FORMAT(ROUND((N2.nota_valor * ED.valor_talento ) / COALESCE(DetalleCount.detalle_count, 1), 2), 'N2') AS peso,
                FORMAT(ROUND(SUM((N2.nota_valor * ED.valor_talento ) / COALESCE(DetalleCount.detalle_count, 1)) 
                            OVER (PARTITION BY T.tal_nombre), 2), 'N2') AS suma_peso_talento
            FROM calificacion C
            INNER JOIN evaluacion_detalle ED ON C.cal_detalle_eval = ED.evd_id
            INNER JOIN evaluacion E ON ED.evd_evaluacion_id = E.ev_id
            INNER JOIN nota N ON C.cal_calificacion_subordinado = N.nota_id
            INNER JOIN nota N2 ON C.cal_calificacion_jefe = N2.nota_id
            INNER JOIN talento T ON ED.evd_talento_id = T.tal_id
            INNER JOIN detalle_talento DT ON ED.evd_detalle_talento_id = DT.det_tal_id
            LEFT JOIN (
                SELECT 
                    evd_talento_id, 
                    COUNT(*) AS detalle_count
                FROM evaluacion_detalle
                WHERE evd_evaluacion_id = @evalId -- Filtra por la evaluación específica
                GROUP BY evd_talento_id
            ) DetalleCount ON T.tal_id = DetalleCount.evd_talento_id
            WHERE E.ev_tipo_evaluation = @evalId
            AND C.cal_col_subordinado = @colId`;

            const resultado = await connection
                .request()
                .input('colId', sql.UniqueIdentifier, colId)
                .input('evalId', sql.Int, evalId)
                .query(query);

            return resultado.recordset;

        } catch (error) {
            console.error('Error al obtener el resumen de evaluaciones:', error.message);
            throw new Error('Error al obtener el resumen de evaluaciones');
        }
    }

    static async getEvalPdi ({colId, evalId}) {
        try {
            const query_talentos = `
                SELECT DISTINCT
                    T.tal_id AS talento_id,
                    T.tal_nombre AS talento_nombre,
                    AP.act_pdi_nombre AS nombre_actividad,
                    AP.act_pdi_descripcion AS descripcion_actividad,
                    DP.de_pdi_porcentaje AS porcentaje_actividad
                FROM calificacion C
                INNER JOIN evaluacion_detalle ED ON C.cal_detalle_eval = ED.evd_id
                INNER JOIN detalle_pdi DP ON ED.evd_evaluacion_id = DP.de_pdi_eval_id
                INNER JOIN actividades_pdi AP ON DP.de_pdi_act_id = AP.act_pdi_id
                INNER JOIN talento T ON ED.evd_talento_id = T.tal_id
                WHERE ED.evd_evaluacion_id = @evalId
                AND C.cal_col_subordinado = @colId
                `;

            const resultado_talentos = await connection
                .request()
                .input('colId', sql.UniqueIdentifier, colId)
                .input('evalId', sql.Int, evalId)
                .query(query_talentos);

            const query_pdi = `
                SELECT 
                    T.tal_id AS talento_id,
                    AP.act_pdi_nombre AS nombre_actividad,
                    AP.act_pdi_descripcion AS descripcion_actividad,
                    DP.de_pdi_porcentaje AS porcentaje_actividad,
                    DPH.det_pdi_his_descripcion AS detalle_descripcion,
                    DPH.det_pdi_his_fecha AS fecha_detalle
                FROM detalle_pdi_historico DPH
                INNER JOIN detalle_pdi DP ON DPH.det_pdi_his_id_detalle_pdi = DP.de_pdi_id
                INNER JOIN actividades_pdi AP ON DP.de_pdi_act_id = AP.act_pdi_id
                INNER JOIN talento T ON DPH.det_pdi_his_talento_id = T.tal_id
                WHERE DP.de_pdi_eval_id = @evalId
                AND DPH.det_pdi_his_col_subordinado_id = @colId
            `;

            const result_pdi = await connection
                .request()
                .input('colId', sql.UniqueIdentifier, colId)
                .input('evalId', sql.Int, evalId)
                .query(query_pdi)



            const query_avances = `
                SELECT
                    AP.av_pdi_talento_id AS talento_id,
                    AP.av_pdi_fecha_propuesta AS fecha_propuesta,
                    AP.av_pdi_fecha_final AS fecha_final,
                    AP.av_pdi_descripcion AS descripcion
                FROM avance_pdi AP
                WHERE AP.av_pdi_eval_id = @evalId
                AND AP.av_pdi_col_subordinado_id = @colId
            `;

            const result_avances = await connection
                .request()
                .input('colId', sql.UniqueIdentifier, colId)
                .input('evalId', sql.Int, evalId)
                .query(query_avances)


            return {
                talentos: resultado_talentos.recordset,
                pdi: result_pdi.recordset,
                avances: result_avances.recordset
            };

        } catch (error) {
            console.error('Error al obtener el resumen de evaluaciones:', error.message);
            throw new Error('Error al obtener el resumen de evaluaciones');
        }
    }

}