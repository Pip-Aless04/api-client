import sql from 'mssql';
import { connection } from "../../db/db_connection.js";
import bcrypt from 'bcrypt';
import { encryptPlugin } from '../plugins/encrypt.plugin.js';

export class TalentoModel{
    
    static async getAll(filters, typeOfUser) {
        try {
            let query = `SELECT 
                            T.tal_id AS id,
                            T.tal_nombre AS nombre,
                            T.tal_nota AS nota,
                            T.tal_estado AS estado,
                            T.tal_porcentaje AS porcentaje,
                            DT.desc_tal_id AS descripcion_id,
                            DT.desc_tal_texto AS descripcion,
                            DT.desc_tal_personal_a_cargo AS a_cargo,
                            DT.desc_tal_estado AS estado_descripcion
                        FROM talento T
                        JOIN descripcion_talento DT
                        ON DT.desc_tal_tal_pertenece = T.tal_id
                        JOIN colaborador C
                        ON C.col_personal_cargo = DT.desc_tal_personal_a_cargo
                        WHERE T.tal_estado = 'A'
                        AND DT.desc_tal_estado = 'A'`;

            const params = [];
            
            // Agregar condiciones dinámicas basadas en los filtros
            if (filters.nombre) {
                query += ` AND LOWER(tal_nombre) LIKE LOWER(@nombre)`;
                params.push({ name: 'nombre', type: sql.NVarChar, value: `%${filters.nombre}%` });
            }
            if(filters.nota){
                query += ` AND tal_nota LIKE @nota`;
                params.push({ name: 'nota', type: sql.Int, value: filters.nota });
            }
            if (filters.estado) {
                query += ` AND LOWER(tal_estado) LIKE LOWER(@estado)`;
                params.push({ name: 'estado', type: sql.NVarChar, value: filters.estado });
            }
            if (filters.porcentaje) {
                query += ` AND tal_porcentaje LIKE @porcentaje`;
                params.push({ name: 'porcentaje', type: sql.Int, value: filters.porcentaje });
            }
            if (filters.a_cargo) {
                query += ` AND LOWER(DT.desc_tal_personal_a_cargo) LIKE LOWER(@a_cargo)`;
                params.push({ name: 'a_cargo', type: sql.NVarChar, value: `%${filters.a_cargo}%` });
            }
            if (filters.estado_descripcion) {
                query += ` AND LOWER(DT.desc_tal_estado) LIKE LOWER(@estado_descripcion)`;
                params.push({ name: 'estado_descripcion', type: sql.NVarChar, value: filters.estado_descripcion });
            }
            if (typeOfUser) {
                query += ` AND LOWER(C.col_personal_cargo) LIKE LOWER(@typeOfUser)`;
                params.push({ name: 'typeOfUser', type: sql.NVarChar, value: `%${typeOfUser}%` });
            }
            const request = connection.request();
            params.forEach(param => request.input(param.name, param.type, param.value));
            console.log(query)
            const result = await request.query(query);
            
            return result.recordset;    
        
        }catch (err) {
            console.error('Error al obtener los talentos:', err.message);
            throw new Error('Error al obtener los talentos');
        }
    }

    static async getById({id}) {
        try {
            const query = `SELECT 
                            T.tal_id AS id,
                            T.tal_nombre AS nombre,
                            T.tal_nota AS nota,
                            T.tal_estado AS estado,
                            T.tal_porcentaje AS porcentaje,
                            DT.desc_tal_id AS descripcion_id,
                            DT.desc_tal_texto AS descripcion,
                            DT.desc_tal_personal_a_cargo AS a_cargo,
                            DT.desc_tal_estado AS estado_descripcion
                        FROM talento T
                        JOIN descripcion_talento DT
                        ON DT.desc_tal_tal_pertenece = T.tal_id
                        WHERE T.tal_estado = 'A'
                        AND DT.desc_tal_estado = 'A'
                        AND tal_id = @id`

            const response = await connection
                            .request()
                            .input('id', sql.Int, id)
                            .query(query)
            return response.recordset
        } catch (error) {
            console.log('error al ejecutar la consulta')
            throw error
        }
    }

}