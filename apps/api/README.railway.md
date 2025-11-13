# 🚂 Railway Deployment - API

Este README contém informações específicas para deploy no Railway.

## 📦 Arquivos de Configuração

Este projeto inclui configurações otimizadas para Railway:

- `railway.json` - Configuração do builder
- `nixpacks.toml` - Configuração do Nixpacks
- `Procfile` - Comando de start
- `start.sh` - Script de inicialização
- `.railwayignore` - Arquivos a ignorar no deploy

## ⚙️ Configuração Automática

O Railway detecta automaticamente:

✅ Node.js 20.x
✅ npm como package manager
✅ Build command: `npm install && npm run build`
✅ Start command: `npm start`
✅ Port: Variável PORT do Railway

## 🔧 Variáveis de Ambiente Necessárias

Configure estas variáveis no Railway Dashboard:

### Obrigatórias:

```env
DATABASE_URL=mysql://... (copiar do MySQL service)
REDIS_URL=redis://... (copiar do Redis service)
JWT_SECRET=... (gerar: https://generate-secret.vercel.app/32)
JWT_REFRESH_SECRET=... (gerar outro diferente)
NODE_ENV=production
PORT=3001
```

### Opcionais:

```env
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=*
LOG_LEVEL=info
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
SENTRY_DSN=... (se usar Sentry)
```

## 🚀 Deploy via GitHub

1. Conecte o repositório ao Railway
2. Configure Root Directory: `apps/api`
3. Railway detecta automaticamente as configurações
4. Deploy acontece automaticamente

## 🚀 Deploy via CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Navegar para a pasta da API
cd apps/api

# Conectar ao projeto
railway link

# Fazer deploy
railway up
```

## 🗄️ Executar Migrações

Após o primeiro deploy:

```bash
# Push schema para o banco
railway run npm run db:push

# Ou gerar migrations formais
railway run npm run db:generate
railway run npm run db:migrate

# Seed data (opcional)
railway run npm run db:seed
```

## 📊 Logs

### Via Dashboard:
- Railway → Seu serviço → Deployments → View Logs

### Via CLI:
```bash
# Logs em tempo real
railway logs --follow

# Últimas 100 linhas
railway logs --tail 100
```

## 🔍 Troubleshooting

### Build Fails

**Erro: "pnpm not found"**
- Este projeto usa npm, não deve acontecer
- Verifique se railway.json existe

**Erro: "Cannot find module"**
```bash
# Force reinstall
railway run npm install
railway up --force
```

### Runtime Errors

**Erro: "Cannot connect to database"**
```bash
# Verificar DATABASE_URL
railway variables | grep DATABASE_URL

# Testar conexão
railway run -- node -e "console.log(process.env.DATABASE_URL)"
```

**Erro: "JWT_SECRET is required"**
- Adicione as variáveis JWT_SECRET e JWT_REFRESH_SECRET

### Port Issues

**Erro: "EADDRINUSE"**
- Certifique-se que PORT=3001 está configurado
- Railway injeta PORT automaticamente

## 🔄 Redeploy

### Via Dashboard:
- Deployments → ⋮ → Redeploy

### Via CLI:
```bash
railway up --force
```

## 📈 Monitoramento

### Health Check:
```bash
curl https://sua-url.up.railway.app/health
```

### Métricas:
```bash
curl https://sua-url.up.railway.app/metrics
```

## 💰 Custos

Railway cobra por:
- **Compute:** $0.000463/GB-second
- **Database:** Incluído no compute
- **Network:** $0.10/GB egress

**Estimativa para API pequena:**
- Desenvolvimento: $0-5/mês (free tier)
- Produção: $10-20/mês

## 🔐 Segurança

### Checklist:

- [ ] JWT_SECRET e JWT_REFRESH_SECRET são únicos
- [ ] DATABASE_URL não está no código
- [ ] CORS_ORIGIN configurado corretamente
- [ ] Logs não expõem informações sensíveis
- [ ] 2FA ativado no Railway

## 📚 Referências

- [Railway Docs](https://docs.railway.app)
- [Nixpacks](https://nixpacks.com)
- [Deploy Guide Completo](../../DEPLOY-RAILWAY-GUIA-COMPLETO.md)

## 🆘 Suporte

- Railway Discord: https://discord.gg/railway
- GitHub Issues: [Criar issue]
- Guia completo: `/DEPLOY-RAILWAY-GUIA-COMPLETO.md`
