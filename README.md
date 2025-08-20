# Contents of /my-project/README.md

# Gerador de Kaizen

Sistema para criação de apresentações PPTX de projetos Kaizen com interface moderna e intuitiva.

## 🚀 Funcionalidades

- ✅ Interface moderna com design glassmorphism
- ✅ Upload de imagens (antes/depois)
- ✅ Geração automática de PPTX
- ✅ Layout responsivo
- ✅ Servidor HTTPS opcional
- ✅ Validação de campos

## 📁 Estrutura do Projeto

```
my-project/
├── client/          # Frontend React
│   ├── src/
│   │   ├── App.js
│   │   └── styles/
│   └── package.json
├── server/          # Backend Node.js
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers.js
│   │   ├── routes.js
│   │   └── utils.js
│   └── package.json
└── package.json     # Scripts principais
```

## 🔧 Instalação

### Prerequisites
- Node.js 18+ e npm

### Instalação Rápida
```bash
# Clonar repositório
git clone <repository-url>
cd my-project

# Instalar todas as dependências
npm run install-all

# Executar aplicação
npm start
```

### Instalação Manual
```bash
# Backend
cd server
npm install

# Frontend  
cd ../client
npm install
```

## 🌐 Execução

### Desenvolvimento
```bash
npm start              # Cliente + Servidor
npm run client         # Apenas frontend (port 3000)
npm run server         # Apenas backend (port 3001)
```

### HTTPS (Opcional)
```bash
cd server
npm run generate-ssl   # Gerar certificados
USE_HTTPS=true npm run dev
```

## 🚀 Deploy/Publicação

### Frontend (Vercel - Recomendado)
1. Build: `cd client && npm run build`
2. Deploy: Conectar repositório no Vercel

### Backend (Railway/Render)
1. Deploy direto do GitHub
2. Variáveis de ambiente necessárias

## 📦 Scripts Disponíveis

- `npm start` - Executar cliente + servidor
- `npm run client` - Frontend apenas
- `npm run server` - Backend apenas  
- `npm run build` - Build de produção
- `npm run install-all` - Instalar todas dependências

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001  
- **HTTPS:** https://localhost:3443
- **Health Check:** http://localhost:3001/health

## 🔒 Segurança

- HTTPS configurado para produção
- Upload seguro de arquivos
- Validação de tipos de arquivo
- Sanitização de dados

## 📄 Licença

MIT License - veja LICENSE para detalhes.