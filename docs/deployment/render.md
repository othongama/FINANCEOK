# Deploy Guide - Render.com (All-in-One)

## 📋 Overview

- **Plataforma**: Render.com
- **Inclui**: Frontend, Backend, Database, Redis
- **Vantagem**: Tudo em um lugar, fácil de gerenciar
- **Cost**: FREE tier disponível

---

## 🚀 Deploy Completo na Render

### Step 1: Criar Conta

1. Acesse: https://render.com
2. Faça login com GitHub
3. Conecte seu repositório

### Step 2: Criar PostgreSQL Database (ou MySQL)

```bash
1. No Dashboard, click "New +"
2. Selecione "PostgreSQL" (ou "MySQL" se preferir)
3. Configure:
   - Name: finance-blog-db
   - Database: financeblog
   - User: financeblog
   - Region: Oregon (US West) ou Frankfurt (Europe)
   - Plan: Free
4. Click "Create Database"
```

Copie o **Internal Database URL** (será usado no backend)

### Step 3: Criar Redis

```bash
1. Click "New +"
2. Selecione "Redis"
3. Configure:
   - Name: finance-blog-redis
   - Plan: Free (25MB)
4. Click "Create Redis"
```

Copie o **Internal Redis URL**

### Step 4: Deploy do Backend (API)

```bash
1. Click "New +"
2. Selecione "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - Name: finance-blog-api
   - Region: Same as database
   - Branch: main
   - Root Directory: apps/api
   - Environment: Node
   - Build Command: pnpm install && pnpm build
   - Start Command: pnpm start
   - Plan: Free
```

### Step 5: Variáveis de Ambiente (API)

```env
NODE_ENV=production
PORT=3001

# Database (usar Internal Database URL)
DATABASE_URL=postgresql://user:pass@hostname:5432/database

# Redis (usar Internal Redis URL)
REDIS_URL=redis://hostname:6379

# JWT
JWT_SECRET=generate-a-secure-random-string
JWT_REFRESH_SECRET=generate-another-secure-random-string
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS (atualizar depois do deploy do frontend)
CORS_ORIGIN=https://finance-blog-web.onrender.com

# Logs
LOG_LEVEL=info
```

### Step 6: Deploy do Frontend (Web)

```bash
1. Click "New +"
2. Selecione "Static Site"
3. Conecte o mesmo repositório
4. Configure:
   - Name: finance-blog-web
   - Branch: main
   - Root Directory: apps/web
   - Build Command: pnpm install && pnpm build
   - Publish Directory: apps/web/.next
   - Plan: Free
```

### Step 7: Variáveis de Ambiente (Web)

```env
# API URL (usar a URL do backend criado)
NEXT_PUBLIC_API_URL=https://finance-blog-api.onrender.com/api

NODE_ENV=production
```

### Step 8: Executar Migrações

```bash
# No dashboard da API, vá em "Shell"
pnpm db:migrate
pnpm db:seed
```

---

## ✅ URLs Geradas

- **Frontend**: https://finance-blog-web.onrender.com
- **Backend**: https://finance-blog-api.onrender.com
- **API Health**: https://finance-blog-api.onrender.com/health

---

## 💰 Custos Render

### Free Tier Inclui:
- ✅ 750 horas/mês de Web Services
- ✅ PostgreSQL/MySQL grátis (limited)
- ✅ Redis grátis (25MB)
- ✅ SSL automático
- ✅ Auto-deploy do GitHub

### Limitações Free:
- ⚠️ Serviços dormem após 15min de inatividade
- ⚠️ Cold start pode levar 30-60s
- ⚠️ Limitado a 512MB RAM

### Planos Pagos:
- **Starter**: $7/mês (sem sleep, mais RAM)
- **Standard**: $25/mês (2GB RAM, mais recursos)

---

## 🔧 Render.yaml (Infraestrutura como Código)

Crie na raiz do projeto:

```yaml
# render.yaml
services:
  # API Backend
  - type: web
    name: finance-blog-api
    env: node
    region: oregon
    buildCommand: cd apps/api && pnpm install && pnpm build
    startCommand: cd apps/api && pnpm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: finance-blog-db
          property: connectionString
      - key: REDIS_URL
        fromService:
          name: finance-blog-redis
          type: redis
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: JWT_REFRESH_SECRET
        generateValue: true
      - key: CORS_ORIGIN
        value: https://finance-blog-web.onrender.com

  # Frontend
  - type: web
    name: finance-blog-web
    env: static
    buildCommand: cd apps/web && pnpm install && pnpm build
    staticPublishPath: apps/web/.next
    envVars:
      - key: NEXT_PUBLIC_API_URL
        value: https://finance-blog-api.onrender.com/api

databases:
  - name: finance-blog-db
    databaseName: financeblog
    plan: free

  - name: finance-blog-redis
    plan: free
```

Com esse arquivo, você pode fazer deploy de tudo com um comando:

```bash
render deploy
```

---

## 🚀 Vantagens Render

✅ Tudo em uma plataforma
✅ Free tier generoso
✅ SSL automático
✅ Auto-deploy do GitHub
✅ Logs centralizados
✅ Fácil de escalar
✅ PostgreSQL incluído
✅ Sem configuração de servidor

## ⚠️ Desvantagens

❌ Cold start no free tier
❌ Menos flexível que AWS
❌ Sem controle do servidor

---

## 📚 Links

- Render Dashboard: https://dashboard.render.com
- Docs: https://render.com/docs
- Status: https://status.render.com
