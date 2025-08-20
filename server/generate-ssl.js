import selfsigned from 'selfsigned';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Para obter __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Atributos do certificado
const attrs = [
  { name: 'commonName', value: 'localhost' },
  { name: 'countryName', value: 'BR' },
  { shortName: 'ST', value: 'State' },
  { name: 'localityName', value: 'City' },
  { name: 'organizationName', value: 'Dev Organization' },
  { shortName: 'OU', value: 'Development' }
];

// Opções do certificado
const options = {
  keySize: 2048,
  days: 365,
  algorithm: 'sha256',
  extensions: [
    {
      name: 'basicConstraints',
      cA: true
    },
    {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true
    },
    {
      name: 'subjectAltName',
      altNames: [
        {
          type: 2, // DNS
          value: 'localhost'
        },
        {
          type: 7, // IP
          ip: '127.0.0.1'
        }
      ]
    }
  ]
};

console.log('🔐 Gerando certificados SSL...');

// Gerar certificado
const pems = selfsigned.generate(attrs, options);

// Criar diretório SSL se não existir
const sslDir = path.join(__dirname, 'ssl');
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir);
}

// Salvar certificados
fs.writeFileSync(path.join(sslDir, 'cert.pem'), pems.cert);
fs.writeFileSync(path.join(sslDir, 'key.pem'), pems.private);

console.log('✅ Certificados SSL gerados com sucesso!');
console.log('📁 Arquivos criados:');
console.log('   - ssl/cert.pem (certificado)');
console.log('   - ssl/key.pem (chave privada)');
console.log('⚠️  ATENÇÃO: Estes são certificados auto-assinados para desenvolvimento.');
console.log('   Para produção, use certificados de uma CA confiável.');
