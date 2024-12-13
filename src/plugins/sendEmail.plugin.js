import brevo from '@getbrevo/brevo';

export class EmailPlugin {

    constructor() {
        this.apiInstance = new brevo.TransactionalEmailsApi();
        this.apiInstance.setApiKey(
            brevo.TransactionalEmailsApiApiKeys.apiKey,
            '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'
        );
        this.sendSmtpEmail = new brevo.SendSmtpEmail();
        this.from = 'alantiaribal2404@gmail.com';
    }

    sendEmailTest = async ({to, subject, html}) => {
        try {
            this.sendSmtpEmail.subject = subject;        
            this.sendSmtpEmail.to = [{email: to, name: 'Prueba'}];
            this.sendSmtpEmail.htmlContent = html;
            this.sendSmtpEmail.sender = {email: from, name: 'no-reply'};
    
            // Enviamos el correo electrónico usando la API de Brevo
            const result = await this.apiInstance.sendTransacEmail(this.sendSmtpEmail);
            console.log('Correo enviado:', result);  // Log para saber que fue exitoso
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            if (error.response) {
                console.error('Detalles del error:', error.response.body); // Mostrar detalles del error de la API
            }
            throw new Error('Error al enviar el correo electrónico');
        }
    }

    sendEmailChangePasswordCode = async ({to, subject, html}) => {
        try {
            this.sendSmtpEmail.subject = subject;        
            this.sendSmtpEmail.to = [{email: to}];
            this.sendSmtpEmail.htmlContent = html;
            this.sendSmtpEmail.sender = {email: this.from, name: 'no-reply'};
    
            // Enviamos el correo electrónico usando la API de Brevo
            const result = await this.apiInstance.sendTransacEmail(this.sendSmtpEmail);
            console.log('Correo enviado:', result);  // Log para saber que fue exitoso
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            if (error.response) {
                console.error('Detalles del error:', error.response.body); // Mostrar detalles del error de la API
            }
            throw new Error('Error al enviar el correo electrónico');
        }
    }
}
