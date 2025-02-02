const express = require('express');
const bodyParser = require('body-parser');

// 1. Crear aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// 2. Middleware para parsear JSON
app.use(bodyParser.json());

console.log('🚀 Servidor Express inicializando...');

// 3. Definir endpoint POST
app.post('/execute-script', (req, res) => {
  try {
    console.log('📩 Nueva solicitud recibida en /execute-script');

    // 4. Validar payload
    if (!req.body.data || !req.body.data.emailScript) {
      console.warn('⚠️ Payload inválido recibido. Se requiere "data.emailScript"');
      return res.status(400).json({ error: 'Formato de payload inválido' });
    }

    const emailScript = req.body.data.emailScript;

    // 5. Aquí procesarías el script (lógica de negocio)
    console.log('✅ Script recibido correctamente: ---------------------------------- ', emailScript, ' ----------------------------------');

    // 6. Responder con éxito
    res.status(201).json({
      message: '🎉 Script recibido exitosamente',
      script: emailScript
    });

  } catch (error) {
    console.error('🔥 Error interno del servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// 7. Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en: 🌍 http://localhost:${port}`);
});

module.exports = app; // Para testing
