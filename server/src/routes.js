import express from 'express';
import multer from 'multer';
import { generatePPTX } from './controllers.js';

const router = express.Router();

// Configuração do multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
    }
  }
});

// Rota de health check
router.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Kaizen Generator API is running',
    timestamp: new Date().toISOString()
  });
});

router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'kaizen-generator-api',
    timestamp: new Date().toISOString()
  });
});

// Rota para gerar PPTX
router.post('/generate-pptx', upload.fields([
  { name: 'fotoAntes', maxCount: 1 },
  { name: 'fotoDepois', maxCount: 1 }
]), generatePPTX);

export default router;
