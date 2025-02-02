import { createTransport } from "nodemailer";
import { EmailTemplates } from "./emailTemplates.js";

export class EmailPlugin {

    constructor() {

        this.userGmail = process.env.USER_GMAIL;
        this.passAppGmail = process.env.PASS_APP_GMAIL;
        this.transporter = createTransport({
            service: 'gmail',
            auth: {
                user: this.userGmail,
                pass: this.passAppGmail
            }
        });
        this.template = new EmailTemplates();
        this.from = `"🍦Pops  - Bienestar Integral" <${this.userGmail}>`
    }

    sendEmailTest = async ({to, subject, html}) => {
        try {
            const info = await this.transporter.sendMail({
                from: this.from,
                to,
                subject,
                html
            });
            console.log('Correo enviado:', info.messageId);  // Log para saber que fue exitoso
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            if (error.response) {
                console.error('Detalles del error:', error.response.body); // Mostrar detalles del error de la API
            }
            throw new Error('Error al enviar el correo electrónico');
        }
    }

    sendEmailChangePasswordCode = async ({to, subject, code, user}) => {
        try {
            
            const html = this.template.sendEmailChangePasswordCode({user, code});

            const info = await this.transporter.sendMail({
                from: this.from,
                to,
                subject,
                html
            });
            console.log('Correo enviado:', info.messageId);  // Log para saber que fue exitoso
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            if (error.response) {
                console.error('Detalles del error:', error.response.body); // Mostrar detalles del error de la API
            }
            throw new Error('Error al enviar el correo electrónico');
        }
    }

    sendEmailReportRequested = async ({to, subject, subordinado, jefe, email_jefe, report}) => {
        try {
            
            const html = this.template.requestedReportTemplate({subordinado, jefe, message: report});
            
            // Enviar el correo de subordinado
            const info = await this.transporter.sendMail({
                from: this.from,
                to,
                subject,
                html
            });

            console.log('Correo enviado:', info.messageId);  // Log para saber que fue exitoso

            // Si el reporte requiere enviar un correo al jefe
            if (report === 2) {
                const jefeHtml = this.template.requestedReportTemplate({subordinado, jefe, message: 6});
                await this.transporter.sendMail({
                    from: this.from,
                    to: email_jefe,  // Asumiendo que jefe tiene un campo 'email'
                    subject,
                    html: jefeHtml,
                });
            }

        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            if (error.response) {
                console.error('Detalles del error:', error.response.body); // Mostrar detalles del error de la API
            }
        }
    }

}