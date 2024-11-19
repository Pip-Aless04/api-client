// auth.controller.js
import { validateAuth, validatePartialAuth } from "../schemas/auth.schema.js";
import { createToken } from "../plugins/createJwt.plugin.js";
import { EmailPlugin } from "../plugins/sendEmail.plugin.js";
import { generateCode } from "../plugins/generateCode.plugin.js";

export class AuthController {
    constructor({ AuthModel }) {
        this.authModel = AuthModel;
    }

    authLogin = async (req, res) => {
        try {
            const { ident, clave } = req.body;
            console.log(req.body);
            const result = await validatePartialAuth({ ident, clave });
            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }
    
            const authUser = await this.authModel.login(ident, clave);
            if (!authUser.success) {
                return res.status(400).json({ error: authUser.error });
            }
    
            const token = await createToken(authUser.col_info, '1d');
            res.cookie('acces_token', token, { 
                httpOnly: true, 
                sameSite: 'strict', 
                secure: false, /*true en produccion*/
                maxAge: 86400000 /*1 día*/
            });
            req.user = authUser.col_info;
            
            return res.status(200).json({ message: 'Iniciando sesión...', user: authUser.col_info });
            
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };
    
    register = async (req, res) => {
        try {
            const validate = validatePartialAuth(req.body);
            if (!validate.success) {
                return res.status(400).json({ error: validate.error });
            }
    
            const authUser = await this.authModel.register(req.body);
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
    
    changePasswordPrueba = async (req, res) => {
        try {
            const {ident, clave} = req.body;
            const result = await this.authModel.changePasswordPrueba({ident, clave});
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error.message);
            return res.status(500).json({ error: 'Error al cambiar la contraseña' });
        }
    }

    changePassword = async (req, res) => {
        const {ident} = req.body;
        try {
            const validate = validatePartialColaborador({ident});
            if (!validate.success) return res.status(400).json({ error: validate.error });
            
            const itExist = await this.authModel.validateChangePasswordInfo({ident});

            const code = generateCode(6);
            const expires = Date.now() + 10 * 60 * 1000;

            const col_info = await this.authModel.storeResetCode({
                ident: ident,
                email: itExist.col_info.email,
                id: itExist.col_info.id,
                code: code,
                expires: expires
            });
            
            if (!col_info.success) return res.status(400).json({ error: col_info.error });
            
            const emailMessage = new EmailPlugin();
            await emailMessage.sendEmailChangePasswordCode({
                to: itExist.col_info.email,
                subject: 'Código de seguridad',
                html: `<p>Su codigo de seguridad es: ${code}</p>
                        <br/><p><strong>No lo comparta con nadie</strong></p>
                        <br/>
                        <p>Si no ha solicitado cambio de clave, comuníquese con el departamento de transfrormación digital.</p>`
            });

            const token = await createToken({
                id:itExist.col_info.id,
                ident: itExist.col_info.identificacion,
                email: itExist.col_info.email
            }, '10m');
            res.cookie(`change_password_token_${itExist.col_info.id}`, token, { httpOnly: true, sameSite: 'strict', secure: true });
            console.log('token:', token);
            console.log(req.cookies);

            return res.status(200).json({ 
                message: 'Solicitud de cambio de clave enviada', 
                info: {
                    ident: itExist.col_info.identificacion,
                    id: itExist.col_info.id,
                    email: itExist.col_info.email,
                    code: code,
                    expires: expires
                    } 
                });
        }catch(error) {
            console.error('Error al solicitar cambio de clave:', error.message);
            return res.status(500).json({ error: 'Error al solicitar cambio de clave' });
        }
    }


    validateChangePasswordCode = async (req, res) => {
        try {
            const {code} = req.body;
            
            const result = await this.authModel.validateChangePasswordCode({code});

            return res.status(200).json(result);

        } catch (error) {
            
        }
    };

    setNewPassword = async (req, res) => {
        try {
            const code = generateCode(6);
            console.log(code)
            
            const email = new EmailPlugin();
            await email.sendEmailPrueba({
                to: 'aless.arias04@gmail.com',
                from: 'alantiaribal2404@gmail.com',
                subject: 'Prueba',
                html: '<p>Prueba</p>'
            });

            return res.send('Correo enviado correctamente');
        } catch (error) {
            console.error('Error en el servidor:', error.message);
            return res.status(500).send('Error al enviar el correo');
        }
    };


    logout = async (req, res) => {
        try {
            res.clearCookie('acces_token');
            return res.status(200).json({ message: 'Sesión cerrada correctamente' }).redirect('/dhcoapp');
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
    };
}
