# Deploy Guide - Vercel + Railway

## 📋 Overview

- **Frontend**: Vercel (Next.js)
- **Backend**: Railway (Express API)
- **Database**: Railway (MySQL)
- **Cache**: Railway (Redis)
- **Cost**: FREE tier disponível

---

## 🎯 Parte 1: Deploy do Backend na Railway

### Step 1: Criar conta na Railway

1. Acesse: https://railway.app
2. Faça login com GitHub
3. Clique em "New Project"

### Step 2: Adicionar MySQL

```bash
# No Railway Dashboard
1. Click "+ New"
2. Selecione "Database"
3. Escolha "MySQL"
4. Railway irá provisionar automaticamente
```

Copie a `DATABASE_URL` gerada (estará nas variáveis)

### Step 3: Adicionar Redis

```bash
# No Railway Dashboard
1. Click "+ New" novamente
2. Selecione "Database"
3. Escolha "Redis"
4. Railway irá provisionar automaticamente
```

Copie a `REDIS_URL` gerada

### Step 4: Deploy da API

#### Opção A: Via GitHub (Recomendado)

```bash
# No Railway Dashboard
1. Click "+ New"
2. Selecione "GitHub Repo"
3. Conecte seu repositório "FINANCEOK"
4. Selecione a branch principal
5. Configure o Root Directory: "apps/api"
```

#### Opção B: Via Railway CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Inicializar projeto (na pasta apps/api)
cd apps/api
railway init

# Deploy
railway up
```

### Step 5: Configurar Variáveis de Ambiente

No Railway Dashboard, adicione as seguintes variáveis:

```env
# Database (copiar do MySQL service)
DATABASE_URL=mysql://root:password@host:port/railway

# Redis (copiar do Redis service)
REDIS_URL=redis://default:password@host:port

# JWT Secrets (gerar novos)
JWT_SECRET=your-super-secret-key-generate-a-new-one
JWT_REFRESH_SECRET=your-refresh-secret-key-generate-a-new-one

# Environment
NODE_ENV=production
PORT=3001

# CORS (adicionar depois da URL do Vercel)
CORS_ORIGIN=https://your-app.vercel.app

# Sentry (opcional)
SENTRY_DSN=your-sentry-dsn

# Logs
LOG_LEVEL=info
```

### Step 6: Executar Migrações

```bash
# Via Railway CLI
railway run pnpm db:migrate

# Ou adicione no package.json um script de build
"scripts": {
  "build": "tsc && pnpm db:push",
  "start": "node dist/main.js"
}
```

### Step 7: Testar a API

```bash
# A Railway irá gerar uma URL pública
https://your-api.up.railway.app/health
```

---

## 🌐 Parte 2: Deploy do Frontend na Vercel

### Step 1: Preparar o projeto

```bash
# Adicionar arquivo vercel.json na raiz do monorepo
```

Crie o arquivo:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "apps/web/$1"
    }
  ]
}
```

### Step 2: Deploy na Vercel

#### Opção A: Via Dashboard (Mais Fácil)

```bash
1. Acesse: https://vercel.com
2. Login com GitHub
3. Click "Add New Project"
4. Selecione seu repositório "FINANCEOK"
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: apps/web
   - Build Command: pnpm build
   - Output Directory: .next
   - Install Command: pnpm install
```

#### Opção B: Via Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Na pasta apps/web
cd apps/web

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Step 3: Configurar Variáveis de Ambiente

No Vercel Dashboard → Settings → Environment Variables:

```env
# API URL (usar a URL gerada pela Railway)
NEXT_PUBLIC_API_URL=https://your-api.up.railway.app/api

# Node Environment
NODE_ENV=production
```

### Step 4: Conectar API com Frontend

Volte na Railway e atualize a variável `CORS_ORIGIN`:

```env
CORS_ORIGIN=https://your-app.vercel.app
```

Faça redeploy da API na Railway.

---

## ✅ Verificação Final

### Testar Backend
```bash
curl https://your-api.up.railway.app/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2024-11-12T...",
  "uptime": 123.45,
  "environment": "production"
}
```

### Testar Frontend
```bash
# Abrir no navegador
https://your-app.vercel.app
```

### Testar Integração
```bash
# No frontend, testar chamadas à API
# Verificar Network tab no DevTools
```

---

## 🔄 Deploy Automático (CI/CD)

### GitHub Actions já configurado!

Seu projeto já tem workflows configurados em `.github/workflows/`:
- `ci.yml` - Testes e build
- `cd.yml` - Deploy automático

### Para ativar deploy automático:

1. **Railway**: Conecte via GitHub (já feito no Step 4)
2. **Vercel**: Conecte via GitHub (já feito no Step 2)

Agora, a cada push na branch `main`:
- CI/CD roda testes
- Build é verificado
- Deploy automático para staging/production

---

## 💰 Custos

### Railway
- **Free Tier**: $5 de crédito/mês
- **Starter**: $5/mês por serviço após free tier
- Estimativa: $0-10/mês para começar

### Vercel
- **Hobby**: GRÁTIS (100GB bandwidth)
- **Pro**: $20/mês (se precisar mais recursos)

**Total estimado**: $0-15/mês para começar

---

## 🔧 Troubleshooting

### Erro: Cannot connect to database
```bash
# Verificar se DATABASE_URL está correta
railway variables

# Testar conexão
railway run -- node -e "console.log(process.env.DATABASE_URL)"
```

### Erro: CORS blocked
```bash
# Verificar CORS_ORIGIN no backend
# Deve conter a URL exata do Vercel (com https://)
```

### Erro: Build failed
```bash
# Verificar logs
railway logs

# Ou no Vercel
vercel logs
```

---

## 📊 Monitoramento

### Railway
```bash
# Ver logs em tempo real
railway logs --follow

# Ver métricas
railway status
```

### Vercel
```bash
# Ver logs
vercel logs [deployment-url]

# Analytics disponível no dashboard
```

---

## 🚀 Próximos Passos

1. ✅ Configurar domínio customizado
2. ✅ Adicionar SSL (automático no Vercel e Railway)
3. ✅ Configurar Sentry para error tracking
4. ✅ Adicionar monitoring (Grafana Cloud)
5. ✅ Configurar backups automáticos do banco

---

## 📚 Links Úteis

- Railway Dashboard: https://railway.app/dashboard
- Vercel Dashboard: https://vercel.com/dashboard
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
