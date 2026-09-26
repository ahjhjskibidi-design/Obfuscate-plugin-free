import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.send('<h1>Lua Obf OK</h1><p>Server running.</p>');
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, version: '1.0.0' });
});

app.post('/api/obfuscate', (req, res) => {
  const body = req.body || {};
  const code = body.code;
  if (typeof code !== 'string') {
    return res.status(400).json({ ok: false, error: 'Missing code' });
  }
  res.json({ ok: true, output: '-- Obfuscated\n' + code });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:' + PORT);
});