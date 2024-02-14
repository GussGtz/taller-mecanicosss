const express = require('express');
const correoController = require('../Controllers/correoController');
const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

// Ruta para enviar un correo electrónico
router.post('/enviar-correo', async (req, res) => {
  const { destinatario, asunto, cuerpo } = req.body;

  if (!destinatario || !asunto || !cuerpo) {
    return res.status(400).json({ error: 'Datos de correo incompletos' });
  }

  try {
    const exito = await correoController.enviarCorreo(destinatario, asunto, cuerpo);
    if (exito) {
      return res.json({ mensaje: 'Correo electrónico enviado con éxito' });
    } else {
      return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
  }
});

module.exports = router;
