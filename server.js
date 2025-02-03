const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(bodyParser.json());

console.log('🚀 Initializing Express server...');

app.post('/execute-script', (req, res) => {
  try {
    console.log('📩 New request received at /execute-script');

    if (!req.body.data || !req.body.data.emailScript) {
      console.warn('⚠️ Invalid payload. "data.emailScript" is required');
      return res.status(400).json({ error: 'Invalid payload format' });
    }

    const emailScript = req.body.data.emailScript;

    console.log('✅ Script received:', emailScript);

    res.status(201).json({
      message: '🎉 Script successfully received',
      script: emailScript
    });
  } catch (error) {
    console.error('🔥 Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  if (isProduction) {
    console.log(`🚀 Server running in PRODUCTION environment! 🏭 Port: ${port}`);
  } else {
    console.log(`🚀 Server running in DEVELOPMENT mode at: 🌍 http://localhost:${port}`);
  }
});

module.exports = app;