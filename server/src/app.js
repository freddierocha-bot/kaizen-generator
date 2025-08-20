import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes.js';
import { fileURLToPath } from 'url';

// Para obter __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
const USE_HTTPS = process.env.USE_HTTPS === 'true';

// Caminhos dos certificados SSL
const sslDir = path.join(__dirname, '..', 'ssl');
const certPath = path.join(sslDir, 'cert.pem');
const keyPath = path.join(sslDir, 'key.pem');

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || ['http://localhost:3000', 'https://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rotas
app.use('/api', routes);

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor do Gerador de Kaizen funcionando!',
    timestamp: new Date().toISOString(),
    https: USE_HTTPS,
    port: USE_HTTPS ? HTTPS_PORT : PORT
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro:', error);
  
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      error: 'Arquivo muito grande',
      message: 'O arquivo enviado excede o limite de 5MB'
    });
  }
  
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: error.message
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.method} ${req.originalUrl} não existe`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

// Configurar HTTPS se habilitado
if (USE_HTTPS) {
  try {
    // Verificar se os certificados existem
    if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
      const httpsOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
      };
      
      https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
        console.log(`🔒 Servidor HTTPS rodando na porta ${HTTPS_PORT}`);
        console.log(`📱 Acesse: https://localhost:${HTTPS_PORT}`);
        console.log(`🏥 Health check: https://localhost:${HTTPS_PORT}/health`);
        console.log(`⚠️  Certificado auto-assinado - aceite o aviso no navegador`);
      });
    } else {
      console.log('❌ Certificados SSL não encontrados!');
      console.log('Execute: node generate-ssl.js para criar os certificados');
    }
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor HTTPS:', error.message);
  }
} else {
  console.log('ℹ️  Para habilitar HTTPS, defina USE_HTTPS=true no .env');
}