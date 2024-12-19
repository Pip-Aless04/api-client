import sql from 'mssql';
import { connection } from "../db/db_connection.js";
import bcrypt from 'bcrypt';
import { bcryptPlugin } from '../plugins/encrypt.plugin.js';

export class AuthModel{

    static async getAll({ ident, name, s_name, p_ape, s_ape, puesto, email, estado, depto, dir, pais, a_cargo, jefe }) {
        try {
            console.log(jefe);
            let query = `
                SELECT 
                    C.col_id AS id,
                    C.col_identificacion AS identificacion,
                    C.col_nombre AS nombre,
                    C.col_segundo_nombre AS segundo_nombre,
                    C.col_primer_apellido AS primer_apellido,
                    C.col_segundo_apellido AS segundo_apellido,
                    PUE.pue_nombre AS puesto,
                    C.col_email AS email,
                    C.col_estado AS estado,
                    DEP.depto_nombre AS departamento,
                    DIR.dir_nombre AS direccion,
                    PAIS.pais_acronimo AS pais,
                    /*C.col_clave AS clave,*/
                    C.col_a_cargo AS a_cargo,
                    CONCAT(C2.col_nombre, ' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS nombre_jefe,
                    C.col_fecha_ingreso AS fecha_ingreso
                FROM colaborador C
                INNER JOIN puesto PUE
                ON C.col_puesto_id = PUE.pue_id
                INNER JOIN departamento DEP
                ON C.col_depto_id = DEP.depto_id
                INNER JOIN direccion DIR
                ON C.col_direccion_id = DIR.dir_id
                INNER JOIN pais PAIS
                ON C.col_pais_id = PAIS.pais_id
                INNER JOIN colaborador C2
                ON C.col_jefatura_id = C2.col_id
                WHERE 1=1
            `;
    
            if (ident) query += ` AND LOWER(C.col_identificacion) = LOWER(@ident)`;
            if (name) query += ` AND LOWER(C.col_nombre) LIKE LOWER(@name)`;
            if (s_name) query += ` AND LOWER(C.col_segundo_nombre) LIKE LOWER(@s_name)`;
            if (p_ape) query += ` AND LOWER(C.col_primer_apellido) LIKE LOWER(@p_ape)`;
            if (s_ape) query += ` AND LOWER(C.col_segundo_apellido) LIKE LOWER(@s_ape)`;
            if (puesto) query += ` AND LOWER(PUE.pue_nombre) LIKE LOWER(@puesto)`;
            if (email) query += ` AND LOWER(C.col_email) LIKE LOWER(@email)`;
            if (estado) query += ` AND LOWER(C.col_estado) = LOWER(@estado)`;
            if (depto) query += ` AND LOWER(DEP.depto_nombre) = @depto`;
            if (dir) query += ` AND LOWER(DIR.dir_nombre) = @dir`;
            if (pais) query += ` AND LOWER(PAIS.pais_acronimo) LIKE LOWER(@pais)`;
            if (a_cargo) query += ` AND LOWER(C.col_a_cargo) LIKE LOWER(@a_cargo)`;
            if (jefe) query += ` AND C.col_jefatura_id = @jefe AND C.col_id <> @jefe`;

            const result = await connection
                .request()
                .input('ident', sql.NVarChar, ident || null)
                .input('name', sql.NVarChar, name || null)
                .input('s_name', sql.NVarChar, s_name || null)
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
                .query(query);

                return { success: true, message: 'Colaboradores obtenidos', cols_info: result.recordset };
        } catch (err) {
            console.error('Error al obtener los colaboradores:', err.message);
            throw new Error('Error al obtener los colaboradores');
        }
    }
    
    static async login(ident, password) {

        console.log('entro al modelo');
        console.log(ident, password);

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

            //console.log(result);

            console.log('siguiente bycript')
            const isValid = await bcryptPlugin(bcrypt)(password);
            if (!isValid) return { success: false, error: 'Contraseña incorrecta' };
            
            //console.log(isValid);
            
            // Obtener la información del colaborador
            const col_info = await connection
                .request()
                .input('ident', sql.NVarChar, ident)
                .query(`
                    SELECT 
                        C.col_id AS id,
                        C.col_identificacion AS identificacion,
                        C.col_nombre AS nombre,
                        C.col_segundo_nombre AS segundo_nombre,
                        C.col_primer_apellido AS primer_apellido,
                        C.col_segundo_apellido AS segundo_apellido,
                        PA.pais_nombre AS pais,
                        P.pue_nombre AS puesto,
                        C.col_email AS email,
                        C.col_estado AS estado,
                        DEP.depto_nombre AS departamento,
                        DIR.dir_nombre AS direccion,
                        C.col_a_cargo AS a_cargo,
                        C.col_jefatura_id AS jefe_id,
                        CONCAT(C2.col_nombre, ' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS nombre_jefe,
                        C.col_fecha_ingreso AS fecha_ingreso,
                        C.col_permiso_id AS permiso
                        /*
                        C.col_respuesta AS respuesta,
                        C.col_calificado AS calificado
                        */
                    FROM colaborador C
                    INNER JOIN pais PA ON C.col_pais_id = PA.pais_id
                    INNER JOIN puesto P ON C.col_puesto_id = P.pue_id
                    INNER JOIN departamento DEP ON C.col_depto_id = DEP.depto_id
                    INNER JOIN direccion DIR ON C.col_direccion_id = DIR.dir_id
                    INNER JOIN colaborador C2 ON C.col_jefatura_id = C2.col_id
                    WHERE C.col_identificacion = @ident
                `);

            console.log(col_info);
    
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
    

    static async register({ ident, nombre, s_nombre, p_ape, s_ape, genero, puesto, email, estado, depto, dir, pais, password, a_cargo, jefe_id, fec_ingreso, permiso }) {
        try {
            const uuidResult = await connection.query('SELECT NEWID() AS uuid;');
            const [{ uuid }] = uuidResult.recordset;
    
            // Si jefe_id es una cadena vacía o null, asigna sql.NULL
            let jefeUUID = jefe_id && jefe_id.trim() ? jefe_id : null;
    
            // Log para verificar valores
            console.log('Valores recibidos:', {
                ident, nombre, s_nombre, p_ape, s_ape, genero, puesto, email, estado, depto, dir, pais, password, a_cargo, jefeUUID, fec_ingreso, permiso
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
            
            const hashedPassword = await bcryptPlugin(bcrypt)(password);

            if (jefeUUID === null) jefeUUID = uuid;
    
            const insertQuery = `
                INSERT INTO colaborador(
                    col_id,
                    col_identificacion,
                    col_nombre,
                    col_segundo_nombre,
                    col_primer_apellido,
                    col_segundo_apellido,
                    col_genero,
                    col_puesto_id,
                    col_email,
                    col_estado,
                    col_depto_id,
                    col_direccion_id,
                    col_pais_id,
                    col_a_cargo,
                    col_jefatura_id,
                    col_fecha_ingreso,
                    col_clave,
                    col_permiso_id
                )
                VALUES(
                    @uuid,
                    @ident,
                    @nombre,
                    @s_nombre,
                    @p_ape,
                    @s_ape,
                    @genero,
                    @puesto,
                    @email,
                    @estado,
                    @depto,
                    @dir,
                    @pais,
                    @a_cargo,
                    @jefe_id,
                    @fec_ingreso,
                    @hashedPassword,
                    @permiso
                );
            `;
            
            console.log('Insert Query:', insertQuery);
    
            const insertResult = await connection
                .request()
                .input('uuid', sql.UniqueIdentifier, uuid)
                .input('ident', sql.NVarChar, ident)
                .input('nombre', sql.NVarChar, nombre)
                .input('s_nombre', sql.NVarChar, s_nombre)
                .input('p_ape', sql.NVarChar, p_ape)
                .input('s_ape', sql.NVarChar, s_ape)
                .input('genero', sql.Char, genero)
                .input('puesto', sql.Int, puesto)
                .input('email', sql.NVarChar, email)
                .input('estado', sql.Char, estado)
                .input('depto', sql.Int, depto)
                .input('dir', sql.Int, dir)
                .input('pais', sql.Int, pais)
                .input('a_cargo', sql.NVarChar, a_cargo)
                .input('jefe_id', jefeUUID ? sql.UniqueIdentifier : sql.NULL, jefeUUID)
                .input('fec_ingreso', sql.DateTime, fec_ingreso)
                .input('hashedPassword', sql.NVarChar, hashedPassword)
                .input('permiso', sql.Int, permiso)
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
                    C.col_identificacion AS ident,
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


    static async storeResetCode({ id, code, expires }) {
        try {
            const insertQuery = `
                INSERT INTO historico_cambio_clave (hcc_col_id, hcc_codigo, hcc_fecha, hcc_fecha_expiracion)
                VALUES (@id, @code, GETDATE(), @fecha_expiracion)
            `;
    
            await connection
                .request()
                .input('id', sql.UniqueIdentifier, id)
                .input('code', sql.NVarChar, code)
                .input('fecha_expiracion', sql.DateTime, expires)
                .query(insertQuery);
    
            return { success: true };
        } catch (error) {
            console.error('Error al guardar el código de restablecimiento:', error.message, error.stack);
            return { success: false, error: 'Error al guardar el código de restablecimiento' };
        }
    }

    static async validateResetCode({ id, code }) {
        try {

            console.log('entro al validar el código');
            console.log(id, code);

            const validateQuery = `
                SELECT TOP 1
                    hcc_codigo AS storedCode,
                    hcc_fecha_expiracion AS expires
                FROM historico_cambio_clave
                WHERE hcc_col_id = @id
                ORDER BY hcc_fecha DESC
            `;
    
            const result = await connection
                .request()
                .input('id', sql.UniqueIdentifier, id)
                .query(validateQuery);
            
            console.log(result);

            if (result.recordset.length === 0) {
                return { success: false, error: 'No se encontró un código registrado para este usuario.' };
            }
    
            const { storedCode, expires } = result.recordset[0];

            // Validar el código y la fecha de expiración
            if (storedCode.toString() !== code.toString()) {
                return { success: false, error: 'El código ingresado no es válido.' };
            }
    
            if (new Date(expires) < new Date()) {
                return { success: false, error: 'El código ha expirado.' };
            }
            console.log('El código es válido');
            return { success: true, message: 'El código es válido' };
        } catch (error) {
            console.error('Error al validar el código:', error.message);
            return { success: false, error: 'Error al validar el código.' };
        }
    }    

    static async resetNewPassword({ id, password }) {
        try {
            console.log('entro a reset password');
            console.log(id, password);
    
            // Hashear la contraseña
            const passwordHash = await bcryptPlugin(bcrypt)(password);
            console.log('Contraseña hasheada:', passwordHash);
    
            const query = `
                UPDATE colaborador
                SET col_clave = @passwordHash
                WHERE col_id = @id
            `;
    
            const result = await connection
                .request()
                .input('id', sql.UniqueIdentifier, id)
                .input('passwordHash', sql.NVarChar, passwordHash)
                .query(query);
    
            console.log('Resultado de la query:', result);
    
            if (result.rowsAffected[0] === 0) {
                return { success: false, error: 'El colaborador no existe o no se pudo actualizar la contraseña' };
            }
    
            return { success: true, message: 'Contraseña cambiada correctamente' };
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error.message, error.stack);
            throw new Error('Error al cambiar la contraseña');
        }
    }

    static async changePasswordHot({ident, password}) {
        try {
            console.log('entro a change password');
            console.log(ident, password);    
            const validateQuery = `SELECT col_identificacion, col_clave, col_estado FROM colaborador WHERE col_identificacion = @ident AND col_estado = 'A'`;
            
            const result = await connection
                .request()
                .input('ident', sql.NVarChar, ident)
                .query(validateQuery);
            
            console.log({result});

            if (result.recordset.length === 0) {
                return { success: false, error: 'El colaborador no existe' };
            }
            

            const hashedPassword = await bcryptPlugin(bcrypt)(password);
            console.log('Contraseña hasheada:', hashedPassword);
    
            const query = `
                UPDATE colaborador
                SET col_clave = @passwordHash
                WHERE col_identificacion = @ident
            `;
    
            const updateResult = await connection
                .request()
                .input('ident', sql.NVarChar, ident)
                .input('passwordHash', sql.NVarChar, hashedPassword)
                .query(query);
    
            console.log('Resultado de la query:', updateResult);
    
            if (updateResult.rowsAffected[0] === 0) {
                return { success: false, error: 'El colaborador no existe o no se pudo actualizar la contraseña' };
            }
    
            return { success: true, message: 'Contraseña cambiada correctamente' };
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error.message);
            throw new Error('Error al cambiar la contraseña');
        }
    }
    
        
}