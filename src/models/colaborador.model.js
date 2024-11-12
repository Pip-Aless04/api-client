import sql from 'mssql';
import { connection } from "../db/db_connection.js";
import bcrypt from 'bcrypt';
import { encryptPlugin } from '../plugins/encrypt.plugin.js';

export class ColaboradorModel{
    
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
    

    static async getById({id}) {
        try {
            const query = `SELECT * FROM colaborador 
                            WHERE col_id = @id`

            const response = await connection
                            .request()
                            .input('id', sql.UniqueIdentifier, id)
                            .query(query)
            return response.recordset
        } catch (error) {
            console.log('error al ejecutar la consulta')
            throw error
        }
    }

    static async register({ ident, nombre, p_ape, s_ape, genero, puesto, email, estado, depto, dir, pais, clave, a_cargo, jefe_id, fec_ingreso, resp }) {
        try {
            const uuidResult = await connection.query('SELECT NEWID() AS uuid;');
            const [{ uuid }] = uuidResult.recordset;
    
            // Si jefe_id es una cadena vacía o null, asigna sql.NULL
            let jefeUUID = jefe_id && jefe_id.trim() ? jefe_id : null;
    
            // Log para verificar valores
            console.log('Valores recibidos:', {
                ident, nombre, p_ape, s_ape, genero, puesto, email, estado, depto, dir, pais, clave, a_cargo, jefeUUID, fec_ingreso, resp
            });
    
            // Si jefe_id no está vacío, verifica que el jefe existe en la base de datos
            if (jefeUUID) {
                const jefe = await connection
                    .request()
                    .input('jefe_id', sql.UniqueIdentifier, jefeUUID)
                    .query(`SELECT col_id FROM colaborador WHERE col_id = @jefe_id`);
                
                if (jefe.recordset.length === 0) {
                    throw new Error('El jefe no existe');
                }
            }
            
            const existQuery = `
                SELECT
                    col_identificacion AS ident,
                    col_email AS email
                FROM colaborador
                WHERE col_identificacion = @ident AND col_email = @email;
            `;
            
            const existResult = await connection
                .request()
                .input('ident', sql.NVarChar, ident)
                .input('email', sql.NVarChar, email)
                .query(existQuery);
    
            if (existResult.recordset.length > 0) throw new Error('El colaborador ya está registrado');
            
            const hashedPassword = await encryptPlugin(bcrypt)(clave);

            if (jefeUUID === null) jefeUUID = uuid;
    
            const insertQuery = `
                INSERT INTO colaborador(
                    col_id,
                    col_identificacion,
                    col_nombre,
                    col_primer_apellido,
                    col_segundo_apellido,
                    col_genero,
                    col_puesto,
                    col_email,
                    col_estado,
                    col_depto_pertenece,
                    col_dir_pertenece,
                    col_pais,
                    col_clave,
                    col_personal_cargo,
                    col_jefe_id,
                    col_fecha_ingreso,
                    col_respuesta
                )
                VALUES(
                    @uuid,
                    @ident,
                    @nombre,
                    @p_ape,
                    @s_ape,
                    @genero,
                    @puesto,
                    @email,
                    @estado,
                    @depto,
                    @dir,
                    @pais,
                    @hashedPassword,
                    @a_cargo,
                    @jefe_id,
                    @fec_ingreso,
                    @resp
                );
            `;
            
            console.log('Insert Query:', insertQuery);
    
            const insertResult = await connection
                .request()
                .input('uuid', sql.UniqueIdentifier, uuid)
                .input('ident', sql.NVarChar, ident)
                .input('nombre', sql.NVarChar, nombre)
                .input('p_ape', sql.NVarChar, p_ape)
                .input('s_ape', sql.NVarChar, s_ape)
                .input('genero', sql.Char, genero)
                .input('puesto', sql.Int, puesto)
                .input('email', sql.NVarChar, email)
                .input('estado', sql.Char, estado)
                .input('depto', sql.Int, depto)
                .input('dir', sql.Int, dir)
                .input('pais', sql.Int, pais)
                .input('hashedPassword', sql.NVarChar, hashedPassword)
                .input('a_cargo', sql.NVarChar, a_cargo)
                // Aquí pasamos sql.NULL si jefeUUID es null
                .input('jefe_id', jefeUUID ? sql.UniqueIdentifier : sql.NULL, jefeUUID)
                .input('fec_ingreso', sql.DateTime, fec_ingreso)
                .input('resp', sql.Char, resp)
                .query(insertQuery);
    
            if (!insertResult || insertResult.rowsAffected.length === 0) {
                return { success: false, error: 'El colaborador no fue registrado' };
            }
    
            return { success: true, message: 'Registro de colaborador exitoso' };
    
        } catch (error) {
            console.error('Error al registrar el colaborador:', error.message, error.stack);
            throw new Error('Error al ingresar el colaborador');
        }
    }
    
    
    

    static async login({ ident, clave }) {
        try {
            // Validar la existencia del usuario
            const validateUser = `
                SELECT col_estado, col_clave
                FROM colaborador 
                WHERE col_identificacion = @ident`;
    
            const result = await connection
                .request()
                .input('ident', sql.NVarChar, ident)
                .query(validateUser);
    
            // Verifica si el colaborador está registrado
            if (!result || result.recordset.length === 0) {
                return { success: false, error: 'colaborador no registrado' };
            }
            
            // Verificar si el colaborador está activo
            const user = result.recordset[0];
            if (user.col_estado !== 'A') {
                return { success: false, error: 'colaborador inactivo' };
            }
    
            // Validar la contraseña
            const validatePassword = await bcrypt.compare(clave, user.col_clave);
            if (!validatePassword) {
                return { success: false, error: 'contraseña incorrecta' };
            }
    
            // Obtener información del usuario
            const queryInfoUser = `
                SELECT 
                    C.col_id AS id,
                    C.col_identificacion AS identificacion,
                    C.col_nombre AS nombre,
                    C.col_primer_apellido AS primer_apellido,
                    C.col_segundo_apellido AS segundo_apellido,
                    P.pue_nombre AS puesto,
                    C.col_email AS email,
                    C.col_estado AS estado,
                    DEP.depto_nombre AS departamento,
                    DIR.dir_nombre AS direccion,
                    C.col_personal_cargo AS a_cargo,
                    CONCAT(C2.col_nombre, ' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS nombre_jefe,
                    FORMAT(C.col_fecha_ingreso, 'dd-MM-yyyy') AS fecha_ingreso,
                    C.col_respuesta AS respuesta
                FROM colaborador C
                INNER JOIN puesto P ON C.col_puesto = P.pue_id
                INNER JOIN departamento DEP ON C.col_depto_pertenece = DEP.depto_id
                INNER JOIN direccion DIR ON C.col_dir_pertenece = DIR.dir_id
                INNER JOIN colaborador C2 ON C.col_jefe_id = C2.col_id
                WHERE C.col_identificacion = @ident`;
    
            const infoUser = await connection
                .request()
                .input('ident', sql.NVarChar, ident)
                .query(queryInfoUser);
    
            // Verifica si se obtuvo información del usuario
            if (!infoUser || infoUser.recordset.length === 0) {
                return { success: false, error: 'no se obtuvieron datos' };
            }
    
            return { success: true, user: infoUser.recordset[0] }; // Devuelve el usuario como un objeto
        } catch (error) {
            console.error('Error en el login:', error);
            throw new Error('error al loguear usuario');
        }
    }
    
}