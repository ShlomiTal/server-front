require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Domain configuration
const INTERNAL_DOMAIN = 'agile-delight.railway.internal';
const PUBLIC_DOMAIN = process.env.RAILWAY_PUBLIC_DOMAIN || 'your-project-name.up.railway.app';
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    domain: req.hostname,
    publicDomain: PUBLIC_DOMAIN,
    internalDomain: INTERNAL_DOMAIN,
    routes: ['/api/signal', '/api/train']
  });
});

// Signal endpoint
app.post('/api/signal', async (req, res) => {
  try {
    const { pair } = req.body;
    const candles = await getMexcCandles(pair);
    const signal = detectSignal(candles);
    res.json(signal);
  } catch (error) {
    console.error('Signal error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Internal URL: http://${INTERNAL_DOMAIN}:${PORT}`);
  console.log(`Public URL: https://${PUBLIC_DOMAIN}`);
});