const nodemailer = require('nodemailer');

enviarMail = async(request, response) => {
    const {destinatario, asunto, cuerpo} = request.body
    console.log(destinatario);
    console.log(asunto);
    console.log(cuerpo);
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
        to: `${destinatario}`,
        subject: `${asunto}`,
        text: `${cuerpo}`
    }
    const transport = nodemailer.createTransport(config);

    const info =  await transport.sendMail(mensaje);
    console.log(info);
}




module.exports = {
    enviarMail
  };