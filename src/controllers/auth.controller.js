import { validateAuth, validatePartialAuth } from "../schemas/auth.schema.js";
import { createToken } from "../plugins/createJwt.plugin.js";
//import { EmailPlugin } from "../plugins/sendEmail.plugin.js";
import { generateCode } from "../plugins/generateCode.plugin.js";

export class AuthController {
    constructor({ AuthModel }) {
        this.authModel = AuthModel;
    }

    getAll = async (req, res) => {
        try {
            const { ident, name, p_ape, s_ape, puesto, email, estado, depto, dir, pais, a_cargo, jefe } = req.query;
            const result = await this.authModel.getAll({ ident, name, p_ape, s_ape, puesto, email, estado, depto, dir, pais, a_cargo, jefe });
            console.log(result);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error.message);
            return res.status(500).json({ error: 'Error al obtener todos los usuarios' });
        }
    };

    authLogin = async (req, res) => {
        try {
            const { ident, password } = req.body;
            
            console.log(req.body);

            // Validar entradas
            if (!ident || !password) {
                return res.status(400).json({ error: 'Identificación y contraseña son requeridas.' });
            }
    
            // Validar credenciales parcialmente (por lógica externa)
            const result = await validatePartialAuth({ ident, password });
            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }
            
            console.log(result);

            // Autenticar usuario
            const authUser = await this.authModel.login(ident, password);
            if (!authUser.success) {
                return res.status(400).json({ error: authUser.error });
            }
            
            //console.log(authUser);

            // Crear token de acceso
            const accessToken = await createToken(authUser.col_info, '1d');
            res.cookie('access_token', accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                secure: false, // Asegúrate de cambiar a true en producción
                maxAge: 86400000, // 1 día
            });
    
            req.user = authUser.col_info;
    
            // Verificar si tiene personal a cargo
            if (authUser.col_info.a_cargo !== 'S') {
                return res.status(200).json({
                    message: 'Iniciando sesión...',
                    user: authUser.col_info,
                });
            }

            // Obtener subordinados y crear token
            const subordinados = await this.authModel.getAll({ jefe: authUser.col_info.id });
            const subordinadosToken = await createToken(subordinados.cols_info, '1d');
            res.cookie('subordinados_token', subordinadosToken, {
                httpOnly: true,
                sameSite: 'strict',
                secure: false, // Asegúrate de cambiar a true en producción
                maxAge: 86400000, // 1 día
            });
    
            req.user.subordinados = subordinados.cols_info;
            
            console.log(req.user);

            return res.status(200).json({
                message: 'Iniciando sesión...',
                user: authUser.col_info,
                subordinados: subordinados.cols_info,
            });
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
    
    register = async (req, res) => {
        try {
            console.log('Registrando usuario...');

            const {ident, nombre, s_nombre, p_ape, s_ape, genero, puesto, email, estado, depto, dir, pais, password, a_cargo, jefe_id, fec_ingreso, permiso} = req.body;
            console.log(req.body);

            const validate = await validateAuth(req.body);
            console.log(validate);

            if (!validate.success) {
                console.error('Errores de validación:', validate.error.errors); // Asegúrate de loguear todos los detalles
                return res.status(400).json({ 
                    message: 'Errores en los datos proporcionados',
                    errors: validate.error.errors 
                });
            }
            
            console.log(validate);

            const authUser = await this.authModel.register({ident, nombre, s_nombre, p_ape, s_ape, genero, puesto, email, estado, depto, dir, pais, password, a_cargo, jefe_id, fec_ingreso, permiso});
            if (!authUser.success) {
                return res.status(400).json({ error: authUser.error });
            }
    
            res.status(200).json({ 
                message: 'Colaborador registrado con éxito',
                user: authUser.col_info 
            });
            
        } catch (error) {
            console.error('Error al registrar:', error.message);
            res.status(500).json({ error: 'Error en el servidor al registrar el colaborador' });
        }
    };
    
    changePasswordHot = async (req, res) => {
        try {
            const {ident, password} = req.body;
            const result = await this.authModel.changePasswordHot({ident, password});
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error.message);
            return res.status(500).json({ error: 'Error al cambiar la contraseña' });
        }
    }

    requestPasswordReset = async (req, res) => {
        const { ident } = req.body;
        try {
            console.log("entro al controller");
            console.log(ident);
    
            const validate = await validatePartialAuth({ ident });
            if (!validate.success) return res.status(400).json({ error: validate.error });
    
            console.log({ validate });
    
            const itExist = await this.authModel.validateChangePasswordInfo({ ident });
            if (!itExist.success) {
                return res.status(404).json({ error: itExist.error });
            }
    
            console.log({ itExist });
    
            // Extraer la información del colaborador
            const { email, id } = itExist.col_info;
    
            const code = generateCode(6);
            const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos desde ahora
    
            const col_info = await this.authModel.storeResetCode({
                ident,
                id,
                code,
                expires,
            });
    
            if (!col_info.success) return res.status(400).json({ error: col_info.error });
            
            /*
            const emailMessage = new EmailPlugin();
            await emailMessage.sendEmailChangePasswordCode({
                to: email,
                subject: 'Código de seguridad',
                html: `<p>Su código de seguridad es: ${code}</p>
                        <br/><p><strong>No lo comparta con nadie</strong></p>
                        <br/>
                        <p>Si no ha solicitado cambio de clave, comuníquese con el departamento de transformación digital.</p>`,
            });
            */
            const token = await createToken(
                {
                    id,
                    ident,
                    email,
                },
                '10m'
            );
    
            res.cookie(`change_password_token_${id}`, token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
            });
    
            req.user = itExist.col_info;
            console.log(req.user);
            console.log('token:', token);
    
            return res.status(200).json({
                message: 'Solicitud de cambio de clave enviada',
                info: {
                    ident,
                    id,
                    email,
                    code,
                    expires,
                },
            });
        } catch (error) {
            console.error('Error al solicitar cambio de clave:', error.message);
            return res.status(500).json({ error: 'Error al solicitar cambio de clave' });
        }
    };
    

    setNewPassword = async (req, res) => {
        try {
            const { code, password } = req.body;
            const { id } = req.user.info;
            console.log({ id, code, password });

            // Validar el código
            const validateCode = await this.authModel.validateResetCode({ id, code });
            if (!validateCode.success) return res.status(400).json({ error: validateCode.error });
            
            console.log({validateCode});

            // Cambiar la contraseña
            const result = await this.authModel.resetNewPassword({ id, password });
            if (!result.success) return res.status(400).json({ error: result.error });
            
            console.log({result});

            return res.status(200).json({ message: 'Contraseña cambiada correctamente' });
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error.message);
            return res.status(500).json({ error: 'Error al cambiar la contraseña' });
        }
    };
    


    logout = async (req, res) => {
        try {
            res.clearCookie('acces_token');
            return res.status(200).redirect('/dhcoapp');
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
    };
}
