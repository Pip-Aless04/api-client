/*
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
*/

import brevo from '@getbrevo/brevo';
let defaultClient = brevo.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = 'KO2rWdkhY64DUqJC';

let apiInstance = new brevo.TransactionalEmailsApi();
let sendSmtpEmail = new brevo.SendSmtpEmail();

sendSmtpEmail.subject = "My {{params.subject}}";
sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
sendSmtpEmail.sender = { "name": "John", "email": "alantiaribal2404@gmail.com" };
sendSmtpEmail.to = [
  { "email": "aless.arias04@gmail.com", "name": "Aless" },
];
sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };


apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function (error) {
  console.error(error);
});