import sql from 'mssql';
import { connection } from "../db/db_connection.js";
import bcrypt from 'bcrypt';
import { bcryptPlugin } from '../plugins/encrypt.plugin.js';

export class AuthModel{

    static async getAll({ ident, name, p_ape, s_ape, puesto, email, estado, depto, dir, pais, a_cargo, jefe, res }) {
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
                    /*C.col_clave AS clave,*/
                    C.col_personal_cargo AS a_cargo,
                    CONCAT(C2.col_nombre, ' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS nombre_jefe,
                    C.col_fecha_ingreso AS fecha_ingreso,
                    C.col_respuesta AS respuesta
                FROM colaborador C
                INNER JOIN puesto PUE
                ON C.col_puesto = PUE.pue_id
                INNER JOIN departamento DEP
                ON C.col_depto_pertenece = DEP.depto_id
                INNER JOIN direccion DIR
                ON C.col_dir_pertenece = DIR.dir_id
                INNER JOIN pais PAIS
                ON C.col_pais = PAIS.pais_id
                INNER JOIN colaborador C2
                ON C.col_jefe_id = C2.col_id
                WHERE 1=1
            `;
    
            if (ident) query += ` AND LOWER(C.col_identificacion) = LOWER(@ident)`;
            if (name) query += ` AND LOWER(C.col_nombre) LIKE LOWER(@name)`;
            if (p_ape) query += ` AND LOWER(C.col_primer_apellido) LIKE LOWER(@p_ape)`;
            if (s_ape) query += ` AND LOWER(C.col_segundo_apellido) LIKE LOWER(@s_ape)`;
            if (puesto) query += ` AND LOWER(PUE.pue_nombre) LIKE LOWER(@puesto)`;
            if (email) query += ` AND LOWER(C.col_email) LIKE LOWER(@email)`;
            if (estado) query += ` AND LOWER(C.col_estado) = LOWER(@estado)`;
            if (depto) query += ` AND LOWER(DEP.depto_nombre) = @depto`;
            if (dir) query += ` AND LOWER(DIR.dir_nombre) = @dir`;
            if (pais) query += ` AND LOWER(PAIS.pais_acronimo) LIKE LOWER(@pais)`;
            if (a_cargo) query += ` AND LOWER(C.col_personal_cargo) LIKE LOWER(@a_cargo)`;
            if (jefe) query += ` AND C.col_jefe_id = @jefe`;
            if (res) query += ` AND LOWER(C.col_respuesta) LIKE LOWER(@res)`;
    
            const result = await connection
                .request()
                .input('ident', sql.NVarChar, ident || null)
                .input('name', sql.NVarChar, name || null)
                .input('p_ape', sql.NVarChar, p_ape || null)
                .input('s_ape', sql.NVarChar, s_ape || null)
                .input('puesto', sql.NVarChar, puesto || null)
                .input('email', sql.NVarChar, email || null)
                .input('estado', sql.NVarChar, estado || null)
                .input('depto', sql.NVarChar, depto || null)
                .input('dir', sql.NVarChar, dir || null)
                .input('pais', sql.NVarChar, pais || null)
                .input('a_cargo', sql.NVarChar, a_cargo || null)
                .input('jefe', sql.UniqueIdentifier, jefe || null)
                .input('res', sql.NVarChar, res || null)
                .query(query);

            return res.status(200).json({ success: true, message: 'Colaboradores obtenidos', col_info: result.recordset });
        } catch (err) {
            console.error('Error al obtener los colaboradores:', err.message);
            throw new Error('Error al obtener los colaboradores');
        }
    }
    
    static async login(ident, clave) {
        const validateQuery = `SELECT col_identificacion, col_clave, col_estado FROM colaborador WHERE col_identificacion = @ident`;
        
        try {
            const result = await connection
                .request()
                .input('ident', sql.NVarChar, ident)
                .query(validateQuery);
            
            if (result.recordset.length === 0) {
                return { success: false, error: 'Colaborador no encontrado' };
            } else if (result.recordset[0].col_estado !== 'A') {
                return { success: false, error: 'Colaborador inactivo' };
            }

            const isValid = await bcrypt.compare(clave, result.recordset[0].col_clave);
            if (!isValid) return { success: false, error: 'Contraseña incorrecta' };
            
            // Obtener la información del colaborador
            const col_info = await connection
                .request()
                .input('ident', sql.NVarChar, ident)
                .query(`
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
                        C.col_fecha_ingreso AS fecha_ingreso,
                        C.col_respuesta AS respuesta,
                        C.col_calificado AS calificado
                    FROM colaborador C
                    INNER JOIN puesto P ON C.col_puesto = P.pue_id
                    INNER JOIN departamento DEP ON C.col_depto_pertenece = DEP.depto_id
                    INNER JOIN direccion DIR ON C.col_dir_pertenece = DIR.dir_id
                    INNER JOIN colaborador C2 ON C.col_jefe_id = C2.col_id
                    WHERE C.col_identificacion = @ident
                `);
    
            if (col_info.recordset.length === 0) {
                return { success: false, error: 'Colaborador no encontrado' };
            }
            
            return { 
                success: true, 
                message: 'Colaborador logueado correctamente', 
                col_info: col_info.recordset[0], 
            };
    
        } catch (e) {
            console.error('Error al iniciar sesión:', e.message);
            throw new Error('Error al iniciar sesión');
        }
    }
    

    static async register({ ident, nombre, p_ape, s_ape, genero, puesto, email, estado, depto, dir, pais, clave, a_cargo, jefe_id, fec_ingreso }) {
        try {
            const uuidResult = await connection.query('SELECT NEWID() AS uuid;');
            const [{ uuid }] = uuidResult.recordset;
    
            // Si jefe_id es una cadena vacía o null, asigna sql.NULL
            let jefeUUID = jefe_id && jefe_id.trim() ? jefe_id : null;
    
            // Log para verificar valores
            console.log('Valores recibidos:', {
                ident, nombre, p_ape, s_ape, genero, puesto, email, estado, depto, dir, pais, clave, a_cargo, jefeUUID, fec_ingreso
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
            
            const hashedPassword = await bcryptPlugin(bcrypt)(clave);

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
                    col_fecha_ingreso
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
                    @fec_ingreso
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
                .input('jefe_id', jefeUUID ? sql.UniqueIdentifier : sql.NULL, jefeUUID)
                .input('fec_ingreso', sql.DateTime, fec_ingreso)
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

    static async validateChangePasswordInfo({ ident }) {
        try {
            let query = `
                SELECT 
                    C.col_id AS id,
                    C.col_identificacion AS identificacion,
                    C.col_email AS email
                FROM colaborador C
                WHERE C.col_identificacion = @ident
            `;
    
            const result = await connection
                .request()
                .input('ident', sql.NVarChar, ident)
                .query(query);
    
            if (result.recordset.length === 0) {
                return { success: false, error: 'El colaborador no existe' };
            }
    
            // Retornando solo el primer registro encontrado (por seguridad)
            return { success: true, col_info: result.recordset[0] };
    
        } catch (error) {
            console.error('Error al validar la información de cambio de clave:', error.message, error.stack);
            throw new Error('Error al validar la información de cambio de clave');
        }
    }
    

    static async changePasswordPrueba({ident, clave}){
        
        try {

            const passwordHash = await bcryptPlugin(bcrypt)(clave);

            const query = 'UPDATE colaborador SET col_clave = @passwordHash WHERE col_identificacion = @ident';
            const result = await connection
                .request()
                .input('ident', sql.NVarChar, ident)
                .input('passwordHash', sql.NVarChar, passwordHash)
                .query(query);

            if (result.length === 0) {
                return { success: false, error: 'El colaborador no existe' };
            }

            return { success: true, message: 'Contraseña cambiada correctamente' };
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error.message, error.stack);
            throw new Error('Error al cambiar la contraseña');
        }
    }

    static async storeResetCode({ident, email, code, expires}){
        try {
            
            const insertQuery = `
                INSERT INTO log_cambio_clave(
                    lcc_col_id,
                    lcc_codigo,
                    lcc_fecha,
                    lcc_fecha_expiracion
                )
                VALUES(
                    (SELECT col_id FROM colaborador WHERE col_email = @email AND col_identificacion = @ident),
                    @code,
                    GETDATE(),
                    @fecha_expiracion
                );
            `;
            
            const insertResult = await connection
                .request()
                .input('ident', sql.NVarChar, ident)
                .input('email', sql.NVarChar, email)
                .input('code', sql.NVarChar, code)
                .input('fecha_expiracion', sql.DateTime, expires)
                .query(insertQuery);    
                
            if (!insertResult || insertResult.rowsAffected.length === 0) {
                return { success: false, error: 'No se pudo registrar el cambio de clave' };
            }
            
            return { success: true, message: 'Registro de colaborador exitoso' };

        } catch (error) {
            console.error('Error al registrar el cambio de clave:', error.message, error.stack);
            throw new Error('Error al registrar el cambio de clave');
        }
    }

    static async validateChangePasswordCode({code}){
        try {
            const query = `
                SELECT
                    lcc_col_id AS col_id,
                    lcc_codigo AS code,
                    lcc_fecha AS date,
                    lcc_fecha_expiracion AS expires
                FROM log_cambio_clave
                WHERE lcc_codigo = @code AND lcc_fecha_expiracion > GETDATE()
            `;

            const result = await connection
                .request()
                .input('code', sql.NVarChar, code)
                .query(query);

            if (result.recordset.length === 0) {
                return { success: false, error: 'Código de cambio de clave no encontrado' };
            }
        } catch (error) {
            console.error('Error al validar el código de cambio de clave:', error.message, error.stack);
            throw new Error('Error al validar el código de cambio de clave');
        }
    }
        
}