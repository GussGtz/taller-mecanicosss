const nodemailer = require('nodemailer');

enviarMail = async() => {

    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'diegoalemanmena@gmail.com',
            pass: 'qaym hfin fvkp nnvg',
        }
    }
    const mensaje = {
        from: 'diegoalemanmena@gmail.com',
        to: 'diegoalemanmena@gmail.com',
        subject: 'Correo desde la api',
        text: 'Envio de correo desde node js utilizando nodemailer para poder probar que la api funciona'
    }
    const transport = nodemailer.createTransport(config);

    const info =  await transport.sendMail(mensaje);
    console.log(info);
}

enviarMail();