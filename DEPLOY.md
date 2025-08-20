# 🚀 Guia de Publicação - Kaizen Generator

## Opções de Deploy

### 📱 **OPÇÃO 1: Deploy Rápido (Recomendado)**

#### **Frontend (Vercel) - GRATUITO**
1. **Acesse:** https://vercel.com
2. **Faça login** com GitHub/Google
3. **Importe projeto:**
   - Clique em "New Project"
   - Conecte seu GitHub e selecione o repositório
   - Configure:
     - **Root Directory:** `client`
     - **Build Command:** `npm run build`
     - **Output Directory:** `build`
4. **Deploy automático** em ~2 minutos

#### **Backend (Railway) - GRATUITO**
1. **Acesse:** https://railway.app
2. **Faça login** com GitHub
3. **Deploy from GitHub:**
   - Selecione seu repositório
   - Configure:
     - **Root Directory:** `server`
     - **Start Command:** `npm start`
4. **Adicione variáveis de ambiente:**
   ```
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://seu-app.vercel.app
   ```

---

### 🔧 **OPÇÃO 2: Deploy Manual**

#### **Pré-requisitos:**
```bash
# Instalar CLIs
npm install -g vercel
npm install -g @railway/cli
```

#### **Deploy Frontend:**
```bash
cd client
npm run build
vercel --prod
```

#### **Deploy Backend:**
```bash
cd server
railway login
railway deploy
```

---

### 🌐 **OPÇÃO 3: Netlify + Render**

#### **Frontend (Netlify):**
1. **Acesse:** https://netlify.com
2. **Drag & Drop** a pasta `client/build`
3. **Configure redirects** (arquivo `_redirects` já criado)

#### **Backend (Render):**
1. **Acesse:** https://render.com
2. **New Web Service** conectado ao GitHub
3. **Configure:**
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

---

## ⚙️ Configuração de Produção

### **1. Variáveis de Ambiente**
Crie arquivo `.env` no server com:
```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://seu-frontend-url.com
CORS_ORIGIN=https://seu-frontend-url.com
```

### **2. Atualizar URLs no Frontend**
No `client/src/App.js`, linha 47:
```javascript
// Trocar para URL do seu backend em produção
const response = await fetch('https://seu-backend-url.com/generate-ppt', {
```

### **3. Configuração de CORS**
O servidor já está configurado para produção com CORS dinâmico.

---

## 🎯 Deploy em 5 Minutos

### **Método Mais Rápido:**
1. **Push para GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deploy"
   git push origin main
   ```

2. **Frontend (Vercel):**
   - Acesse vercel.com
   - Import from GitHub
   - Root: `client`
   - Deploy

3. **Backend (Railway):**
   - Acesse railway.app
   - Deploy from GitHub
   - Root: `server`
   - Adicionar env vars

4. **Conectar os dois:**
   - Copie URL do Railway
   - Cole no código do frontend
   - Redeploy no Vercel

**✅ Site publicado em ~5 minutos!**

---

## 🔍 Troubleshooting

### **Erro de CORS:**
- Verificar `FRONTEND_URL` no backend
- Confirmar URLs nas configurações

### **Build Error:**
- Rodar `npm run build` localmente primeiro
- Verificar dependências no package.json

### **Upload não funciona:**
- Verificar configuração de multer
- Confirmar limites de arquivo (10MB)

---

## 📱 URLs de Exemplo

Após deploy, você terá:
- **Frontend:** `https://kaizen-generator.vercel.app`
- **Backend:** `https://kaizen-api.railway.app`

---

## 🎉 Pronto!

Seu site estará público e funcionando com:
- ✅ Upload de imagens
- ✅ Geração de PowerPoint
- ✅ Design moderno e responsivo
- ✅ HTTPS automático
- ✅ CDN global
