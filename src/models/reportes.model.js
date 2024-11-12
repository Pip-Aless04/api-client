import sql from 'mssql';
import { connection } from "../../db/db_connection.js";
import bcrypt from 'bcrypt';
import { encryptPlugin } from '../plugins/encrypt.plugin.js';

export class ReportesModel{
    
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
}