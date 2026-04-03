const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8444;

// Read self-signed certificates
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
};

// Allow requests from the frontend (HTTPS on port 8080)
app.use(
  cors({
    origin: ['https://localhost:8080', 'https://127.0.0.1:8080'],
    methods: ['GET', 'POST'],
  })
);

app.use(express.json());

// API endpoint: GET /api/hello
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from the backend!',
    timestamp: new Date().toISOString(),
    port: PORT,
  });
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Backend HTTPS server running at https://localhost:${PORT}`);
});
