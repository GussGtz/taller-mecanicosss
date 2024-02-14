const nodemailer = require('nodemailer');

// Configuración del servicio de correo electrónico (utilizando Gmail en este ejemplo)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'diegoalemanmena@gmail.com',
    pass: 'qaym hfin fvkp nnvg',
  },
});

// Función para enviar un correo electrónico
const enviarCorreo = async (destinatario, asunto, cuerpo) => {
  try {
    const info = await transporter.sendMail({
      from: 'diegoalemanmena@gmail.com',
      to: destinatario,
      subject: asunto,
      text: cuerpo,
    });

    console.log('Correo electrónico enviado:', info.response);
    return true; // Éxito al enviar el correo
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return false; // Error al enviar el correo
  }
};

module.exports = {
  enviarCorreo
};