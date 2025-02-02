export class EmailTemplates {
    constructor() {}

    reportRequestedTemplate = {
        1: `has registrado una salida de personal, si no fuiste tu, por favor contactanos`,
        2: `has solicitado una salida de vacaciones, si no fuiste tu, por favor contacta con el jefe`,
        3: `has registrado un traslado de personal, si no fuiste tu, por favor contactanos`,
        4: `has solicitado una incapacidad, si no fuiste tu, por favor contactanos`,
        5: `has solicitado una carta, si no fuiste tu, por favor contactanos`,
        6: `ha solicitado una salida de vacaciones`,
    }

    sendEmailChangePasswordCode({user, code}) {
        return `<!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Reporte solicitado</title>
                        <style type="text/css">
                            @media only screen and (max-width: 600px) {
                                .container {
                                    width: 100% !important;
                                }
                                .content {
                                    padding: 24px !important;
                                }
                                .social-links a {
                                    display: block !important;
                                    margin: 10px auto !important;
                                }
                            }
                        </style>
                    </head>
                    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: url('https://dhco.pops.co.cr/img/background.webp') center/cover fixed;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background: transparent;">
                            <tr>
                                <td style="padding: 40px 20px;">
                                    <!-- Container Principal -->
                                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; box-shadow: 0 12px 30px rgba(0,0,0,0.08);" class="container">
                                        <!-- Header con Logo y Mascota -->
                                        <tr>
                                            <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%); border-radius: 24px 24px 0 0;">
                                                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td style="text-align: center;">
                                                            <img src="https://dhco.pops.co.cr/img/POPS_LogoColor.png" alt="Logo POPS" width="200" style="display: block; margin: 0 auto 30px; max-width: 80%;">
                                                            <!--<img src="http://localhost:3000/img/mascota_trans_digital.webp" alt="Mascota POPS" width="120" style="display: block; margin: -20px auto 0; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));">-->
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- Contenido Principal -->
                                        <tr>
                                            <td class="content" style="padding: 48px 40px; background-color: #ffffff;">
                                                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td>
                                                            <h1 style="margin: 0 0 24px 0; font-size: 28px; line-height: 1.3; color: #1abc9c; font-weight: 700; letter-spacing: -0.5px;">
                                                                ¡Hola ${user}! 🍦
                                                            </h1>
                                                            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a5568; letter-spacing: 0.1px;">
                                                                Su codigo de seguridad es: ${code}, expira en <strong>10 minutos</strong>.<br>
                                                                No lo comparta con nadie. Si no ha solicitado cambio de clave, comuníquese con el departamento de bienestar integral.
                                                            </p>
                                                            <!-- Separador Decorativo -->
                                                            <div style="margin: 32px 0; height: 1px; background: linear-gradient(to right, rgba(26,188,156,0.1) 0%, rgba(26,188,156,0.4) 50%, rgba(26,188,156,0.1) 100%);"></div>                                                               
                                            </td>
                                        </tr>
                                        <!-- Footer -->
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                    `
    }

    requestedReportTemplate({subordinado, jefe, message}) {
        console.log(message);
        console.log(this.reportRequestedTemplate[message]);
        return `<!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Reporte solicitado</title>
                        <style type="text/css">
                            @media only screen and (max-width: 600px) {
                                .container {
                                    width: 100% !important;
                                }
                                .content {
                                    padding: 24px !important;
                                }
                                .social-links a {
                                    display: block !important;
                                    margin: 10px auto !important;
                                }
                            }
                        </style>
                    </head>
                    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: url('https://dhco.pops.co.cr/img/background.webp') center/cover fixed;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background: transparent;">
                            <tr>
                                <td style="padding: 40px 20px;">
                                    <!-- Container Principal -->
                                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; box-shadow: 0 12px 30px rgba(0,0,0,0.08);" class="container">
                                        <!-- Header con Logo y Mascota -->
                                        <tr>
                                            <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%); border-radius: 24px 24px 0 0;">
                                                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td style="text-align: center;">
                                                            <img src="https://dhco.pops.co.cr/img/POPS_LogoColor.png" alt="Logo POPS" width="200" style="display: block; margin: 0 auto 30px; max-width: 80%;">
                                                            <!--<img src="http://localhost:3000/img/mascota_trans_digital.webp" alt="Mascota POPS" width="120" style="display: block; margin: -20px auto 0; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));">-->
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- Contenido Principal -->
                                        <tr>
                                            <td class="content" style="padding: 48px 40px; background-color: #ffffff;">
                                                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td>
                                                            <h1 style="margin: 0 0 24px 0; font-size: 28px; line-height: 1.3; color: #1abc9c; font-weight: 700; letter-spacing: -0.5px;">
                                                                ¡Hola ${message === 6 ? jefe : subordinado}! 🍦
                                                            </h1>
                                                            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a5568; letter-spacing: 0.1px;">
                                                                Te informamos que ${message === 6 ? subordinado : ''} ${this.reportRequestedTemplate[message]}
                                                            </p>
                                                            <!-- Separador Decorativo -->
                                                            <div style="margin: 32px 0; height: 1px; background: linear-gradient(to right, rgba(26,188,156,0.1) 0%, rgba(26,188,156,0.4) 50%, rgba(26,188,156,0.1) 100%);"></div>
                                                            <!-- Botón de Acción -->
                                                            ${message === 3 ? `  
                                                                <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 32px auto;">
                                                                    <tr>
                                                                        <td style="border-radius: 50px; background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%); box-shadow: 0 4px 12px rgba(26,188,156,0.2);">
                                                                            <a href="https://popsdhcosite.azurewebsites.net/dhcoapp/" style="display: inline-block; padding: 16px 48px; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; letter-spacing: 0.5px;">
                                                                                Ver más detalles
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            ` : ''}                                                                
                                            </td>
                                        </tr>
                                        <!-- Footer -->
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                    `
    }
}
