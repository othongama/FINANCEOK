# 🚀 Railway Quickstart - Colocando no Ar em 10 Minutos

## ✅ Você já tem:
- [x] Conta na Railway
- [x] MySQL database criado
- [x] DATABASE_URL configurada

## 🎯 Próximos Passos

### Step 1: Adicionar Redis (1 minuto)

```bash
1. No Railway Dashboard, click "+ New"
2. Selecione "Database"
3. Escolha "Redis"
4. Click "Create"
```

✅ Copie a **REDIS_URL** que foi gerada (vai precisar no Step 3)

---

### Step 2: Deploy da API (3 minutos)

#### Opção A: Via GitHub (Recomendado)

```bash
1. No Railway Dashboard, click "+ New"
2. Selecione "GitHub Repo"
3. Escolha seu repositório "FINANCEOK"
4. Configure:
   - Service Name: finance-blog-api
   - Root Directory: apps/api
   - Branch: main ou sua branch atual
5. Click "Deploy"
```

#### Opção B: Via Railway CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Fazer login
railway login

# Na pasta do projeto (raiz)
cd apps/api

# Inicializar
railway init

# Fazer deploy
railway up
```

---

### Step 3: Configurar Variáveis de Ambiente (5 minutos) ⚠️ IMPORTANTE

No Railway, vá em **Variables** do serviço da API e adicione:

```env
# 1. NODE_ENV
NODE_ENV=production

# 2. PORT (Railway define automaticamente, mas garanta)
PORT=3001

# 3. DATABASE_URL (já deve estar se você conectou o MySQL)
# Se não estiver, copie do serviço MySQL
DATABASE_URL=mysql://root:password@host:port/railway

# 4. REDIS_URL (copiar do Redis que você criou no Step 1)
REDIS_URL=redis://default:password@host:port

# 5. JWT_SECRET (GERAR UM NOVO! Não use o exemplo)
# Gere aqui: https://generate-secret.vercel.app/32
JWT_SECRET=COLE_O_SECRET_GERADO_AQUI

# 6. JWT_REFRESH_SECRET (GERAR OUTRO DIFERENTE!)
JWT_REFRESH_SECRET=COLE_OUTRO_SECRET_GERADO_AQUI

# 7. JWT_EXPIRES_IN
JWT_EXPIRES_IN=15m

# 8. JWT_REFRESH_EXPIRES_IN
JWT_REFRESH_EXPIRES_IN=7d

# 9. CORS_ORIGIN (deixe assim por enquanto, vai atualizar depois)
CORS_ORIGIN=*

# 10. LOG_LEVEL
LOG_LEVEL=info

# 11. RATE_LIMIT_WINDOW_MS
RATE_LIMIT_WINDOW_MS=900000

# 12. RATE_LIMIT_MAX
RATE_LIMIT_MAX=100
```

⚠️ **IMPORTANTE**: Depois de adicionar as variáveis, a API vai fazer **redeploy automático**!

---

### Step 4: Executar Migrações (2 minutos)

Você precisa criar as tabelas no banco de dados!

#### Via Railway Dashboard:

```bash
1. No serviço da API, vá na aba "Deployments"
2. Click nos 3 pontinhos (...) do último deployment
3. Escolha "View Logs"
4. Procure por erros de conexão com o banco

# Se houver erros, vá para o próximo método
```

#### Via Railway CLI (Mais confiável):

```bash
# Na pasta apps/api do seu computador
cd apps/api

# Conectar ao projeto Railway
railway link

# Executar as migrações
railway run pnpm db:push

# Se preferir, pode gerar migrations formais:
railway run pnpm db:generate
railway run pnpm db:migrate

# Inserir dados iniciais (usuários e categorias de exemplo)
railway run pnpm db:seed
```

✅ Isso vai criar todas as tabelas (users, articles, categories)

---

### Step 5: Verificar se a API está Funcionando (1 minuto)

```bash
# A Railway gera uma URL pública automaticamente
# Algo como: https://finance-blog-api-production-xxxx.up.railway.app

# Teste o health check:
curl https://SUA_URL_AQUI/health

# Ou abra no navegador:
https://SUA_URL_AQUI/health
```

✅ Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2024-11-12T...",
  "uptime": 123.45,
  "environment": "production"
}
```

---

### Step 6: Deploy do Frontend na Vercel (3 minutos)

#### 1. Criar conta na Vercel

```bash
1. Acesse: https://vercel.com
2. Login com GitHub
3. Click "Add New Project"
```

#### 2. Importar Projeto

```bash
1. Selecione seu repositório "FINANCEOK"
2. Click "Import"
3. Configure:
   - Framework Preset: Next.js
   - Root Directory: apps/web
   - Build Command: cd ../.. && pnpm install && cd apps/web && pnpm build
   - Output Directory: .next
   - Install Command: pnpm install
```

#### 3. Adicionar Variável de Ambiente

```env
# Antes de fazer deploy, adicione:
NEXT_PUBLIC_API_URL=https://SUA_URL_DA_RAILWAY_AQUI/api

# Exemplo:
NEXT_PUBLIC_API_URL=https://finance-blog-api-production-xxxx.up.railway.app/api
```

#### 4. Deploy!

```bash
Click "Deploy"
```

Aguarde 2-3 minutos... ✅ Seu frontend estará no ar!

---

### Step 7: Atualizar CORS no Backend (1 minuto)

Agora que o frontend está no ar, você precisa permitir as requisições dele:

```bash
1. Volte na Railway
2. Vá nas Variables da API
3. Atualize CORS_ORIGIN:

# De:
CORS_ORIGIN=*

# Para:
CORS_ORIGIN=https://seu-app.vercel.app

# (use a URL exata que o Vercel gerou)
```

✅ A API vai fazer redeploy automático

---

## 🎉 Pronto! Seu App Está no Ar!

### URLs Geradas:

- **Frontend**: https://seu-app.vercel.app
- **API**: https://seu-app.up.railway.app
- **Health Check**: https://seu-app.up.railway.app/health

### Testar:

1. Abra o frontend no navegador
2. Abra o DevTools (F12) → Network
3. Navegue pelo site
4. Veja as chamadas para a API funcionando!

---

## 🔐 Credenciais Criadas (Seed Data)

Se você executou `pnpm db:seed`, estes usuários foram criados:

```
Admin:
  Email: admin@financeblog.com
  Senha: admin123

Editor:
  Email: editor@financeblog.com
  Senha: admin123

User:
  Email: user@financeblog.com
  Senha: admin123
```

⚠️ **IMPORTANTE**: Mude essas senhas em produção!

---

## 🐛 Troubleshooting

### API não conecta no banco de dados

```bash
# Verificar se DATABASE_URL está correta
railway variables

# Formato correto:
mysql://root:password@host:port/railway

# Testar conexão manualmente
railway run -- node -e "console.log(process.env.DATABASE_URL)"
```

### CORS Error no Frontend

```bash
# Erro comum:
"Access to fetch at 'https://api...' from origin 'https://vercel...'
has been blocked by CORS policy"

# Solução:
1. Verifique CORS_ORIGIN na Railway
2. Deve ser EXATAMENTE a URL do Vercel (com https://)
3. Sem barra no final
4. Após mudar, aguarde redeploy
```

### Build Failed

```bash
# Ver logs
railway logs --follow

# Erros comuns:
# 1. Faltou variável de ambiente
# 2. DATABASE_URL incorreta
# 3. Node version incompatível

# Solução:
# Adicione ao package.json da API:
"engines": {
  "node": "20.x"
}
```

### Migrations não rodam

```bash
# Se railway run não funciona:

# 1. Instale Railway CLI localmente
npm install -g @railway/cli

# 2. Link ao projeto
railway link

# 3. Execute commands
railway run pnpm db:push
railway run pnpm db:seed
```

---

## 📊 Monitoramento

### Ver Logs em Tempo Real

```bash
# Via CLI
railway logs --follow

# Via Dashboard
Railway → Seu serviço → Deployments → View Logs
```

### Métricas

```bash
# Acesse no navegador:
https://seu-app.up.railway.app/metrics

# Verá métricas Prometheus como:
# - http_requests_total
# - http_request_duration_seconds
# - nodejs_memory_usage
```

---

## 🔄 Deploy Automático

Agora que está configurado, **qualquer push para GitHub** fará deploy automático!

```bash
# Fazer mudanças no código
git add .
git commit -m "feat: nova funcionalidade"
git push

# Railway e Vercel detectam automaticamente e fazem deploy! 🚀
```

---

## 💰 Custos

### Railway Free Tier:
- ✅ $5 de crédito/mês
- ✅ 500 horas de execução
- ✅ Suficiente para desenvolvimento

### Vercel Free Tier:
- ✅ 100GB bandwidth
- ✅ Unlimited deployments
- ✅ Suficiente para começar

**Total: $0/mês para começar!** 🎉

---

## 🚀 Próximos Passos

1. **✅ Testar todas as funcionalidades**
2. **✅ Adicionar domínio customizado** (opcional)
3. **✅ Configurar Sentry** para error tracking
4. **✅ Adicionar Analytics** (Google Analytics, Plausible)
5. **✅ Implementar backups** do banco de dados
6. **✅ Adicionar mais features** ao app!

---

## 📚 Links Úteis

- **Railway Dashboard**: https://railway.app/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Gerar Secrets**: https://generate-secret.vercel.app/32

---

## 💬 Precisa de Ajuda?

- 📖 Guia completo: `docs/deployment/railway-vercel.md`
- 🐛 Reportar problemas: GitHub Issues
- 📧 Email: support@financeblog.com

---

**Parabéns! Seu Finance Blog está no ar! 🎉🚀**
