# 🚀 GUIA DEFINITIVO - Deploy no Railway (100% Funcional)

> **Tempo estimado:** 15-20 minutos
> **Dificuldade:** Fácil (passo a passo detalhado)

---

## ✅ PREPARAÇÃO ANTES DE COMEÇAR

### O que você precisa:

- [ ] Conta no GitHub (com o repositório FINANCEOK)
- [ ] Conta no Railway (crie em: https://railway.app)
- [ ] Código commitado e pushed no GitHub

### ⚠️ IMPORTANTE: Commitar as últimas mudanças

```bash
# Se ainda não commitou as últimas mudanças:
git add .
git commit -m "chore: prepare for Railway deployment"
git push
```

---

## 📋 PARTE 1: CRIAR SERVIÇOS NO RAILWAY (5 minutos)

### Step 1.1: Criar Projeto

```
1. Acesse: https://railway.app/dashboard
2. Click "New Project"
3. Escolha "Empty Project"
4. Nome do projeto: "finance-blog" (ou qualquer nome)
```

---

### Step 1.2: Adicionar MySQL

```
1. No projeto, click "+ New"
2. Selecione "Database"
3. Escolha "MySQL"
4. Aguarde provisionar (1-2 minutos)
```

✅ **MySQL criado!**

---

### Step 1.3: Adicionar Redis

```
1. Click "+ New" novamente
2. Selecione "Database"
3. Escolha "Redis"
4. Aguarde provisionar (30 segundos)
```

✅ **Redis criado!**

---

### Step 1.4: Conectar GitHub e Deploy da API

```
1. Click "+ New" novamente
2. Escolha "GitHub Repo"
3. Se pedir permissões:
   - Click "Configure GitHub App"
   - Selecione seu repositório "FINANCEOK"
   - Authorize
4. Selecione o repositório "FINANCEOK"
5. Click "Add variables later" (vamos configurar depois)
```

⚠️ **IMPORTANTE: Configurar Root Directory**

```
6. Na página do serviço que foi criado:
   - Click em "Settings"
   - Procure "Root Directory"
   - Configure: apps/api
   - Click "Update"
```

✅ **API conectada ao GitHub!**

O Railway vai começar a fazer deploy automaticamente, mas VAI FALHAR (normal, faltam as variáveis).

---

## 🔧 PARTE 2: CONFIGURAR VARIÁVEIS (5 minutos)

### Step 2.1: Ir para Variables

```
1. No serviço da API, click na aba "Variables"
2. Você vai adicionar uma por uma
```

---

### Step 2.2: Copiar DATABASE_URL

```
1. Volte ao dashboard (click no nome do projeto no topo)
2. Click no serviço "MySQL"
3. Vá na aba "Variables"
4. Encontre "DATABASE_URL" ou "MYSQL_URL"
5. Click no ícone de copiar (📋)
```

Volte para o serviço da API e adicione:

```
Variable Name: DATABASE_URL
Value: [Cole a URL que você copiou]
```

Click "Add" ou pressione Enter.

---

### Step 2.3: Copiar REDIS_URL

```
1. Volte ao dashboard
2. Click no serviço "Redis"
3. Vá na aba "Variables"
4. Encontre "REDIS_URL"
5. Click no ícone de copiar (📋)
```

Volte para o serviço da API e adicione:

```
Variable Name: REDIS_URL
Value: [Cole a URL que você copiou]
```

---

### Step 2.4: Gerar JWT Secrets

**IMPORTANTE:** Gere secrets únicos e seguros!

```
1. Abra em outra aba: https://generate-secret.vercel.app/32
2. Copie o secret gerado
3. Volte ao Railway e adicione:

Variable Name: JWT_SECRET
Value: [Cole o secret]
```

```
4. Gere OUTRO secret (recarregue a página do gerador)
5. Adicione:

Variable Name: JWT_REFRESH_SECRET
Value: [Cole o NOVO secret]
```

---

### Step 2.5: Adicionar Variáveis Restantes

Adicione as seguintes variáveis **uma por uma**:

```
NODE_ENV = production
PORT = 3001
JWT_EXPIRES_IN = 15m
JWT_REFRESH_EXPIRES_IN = 7d
CORS_ORIGIN = *
LOG_LEVEL = info
RATE_LIMIT_WINDOW_MS = 900000
RATE_LIMIT_MAX = 100
```

---

### ✅ Checklist de Variáveis

Você deve ter ESTAS 12 variáveis:

- [x] DATABASE_URL
- [x] REDIS_URL
- [x] JWT_SECRET
- [x] JWT_REFRESH_SECRET
- [x] NODE_ENV
- [x] PORT
- [x] JWT_EXPIRES_IN
- [x] JWT_REFRESH_EXPIRES_IN
- [x] CORS_ORIGIN
- [x] LOG_LEVEL
- [x] RATE_LIMIT_WINDOW_MS
- [x] RATE_LIMIT_MAX

---

## 🔄 PARTE 3: FAZER DEPLOY (2 minutos)

### Step 3.1: Trigger Deploy

Depois de adicionar todas as variáveis:

```
1. Vá na aba "Deployments"
2. Click no botão "Deploy" ou "Redeploy"
3. Aguarde (2-3 minutos)
```

### Step 3.2: Acompanhar Build

```
1. Click no deployment que está em progresso
2. Veja os logs em tempo real
```

**Logs de SUCESSO (procure por):**
```
✓ Building...
✓ Installing dependencies...
✓ Running build...
✓ Build successful
✓ Starting...
🚀 Server running on port 3001 in production mode
```

**Se der erro nos logs:**
- Veja a seção "TROUBLESHOOTING" no final

---

## 🗄️ PARTE 4: EXECUTAR MIGRAÇÕES (3 minutos)

### Step 4.1: Instalar Railway CLI (no seu computador)

```bash
npm install -g @railway/cli
```

---

### Step 4.2: Login

```bash
railway login
```

Isso vai abrir o navegador para você autorizar.

---

### Step 4.3: Conectar ao Projeto

```bash
# Vá para a pasta da API
cd apps/api

# Conectar ao projeto Railway
railway link
```

**Selecione:**
- Seu projeto (finance-blog)
- Serviço: API (não MySQL, não Redis)

---

### Step 4.4: Criar Tabelas

```bash
railway run npm run db:push
```

**Você verá:**
```
✓ Pushing schema to database...
✓ Created table 'users'
✓ Created table 'categories'
✓ Created table 'articles'
✓ Created table 'comments'
✓ Done!
```

---

### Step 4.5: Inserir Dados de Teste (Opcional)

```bash
railway run npm run db:seed
```

Isso cria 3 usuários e 5 categorias para testes.

---

## ✅ PARTE 5: TESTAR A API (2 minutos)

### Step 5.1: Pegar a URL

```
1. No Railway, serviço da API
2. Na aba "Settings", procure "Domains"
3. Copie a URL (algo como: https://finance-blog-api-production.up.railway.app)
```

---

### Step 5.2: Testar Health Check

**Abra no navegador:**

```
https://SUA_URL.up.railway.app/health
```

**Deve retornar:**
```json
{
  "status": "ok",
  "timestamp": "2024-11-12T...",
  "uptime": 123.45,
  "environment": "production"
}
```

✅ **Se viu isso, SUA API ESTÁ FUNCIONANDO!** 🎉

---

### Step 5.3: Testar Endpoints

```
# Listar artigos (vazio inicialmente)
https://SUA_URL.up.railway.app/api/articles

# Métricas Prometheus
https://SUA_URL.up.railway.app/metrics
```

---

## 🎨 PARTE 6: DEPLOY DO FRONTEND (Opcional - 5 minutos)

### Step 6.1: Criar Projeto na Vercel

```
1. Acesse: https://vercel.com
2. Login com GitHub
3. Click "New Project"
4. Selecione repositório "FINANCEOK"
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: apps/web
   - Build Command: npm install && npm run build
   - Output Directory: .next
```

---

### Step 6.2: Adicionar Variável

```
Environment Variables:
NEXT_PUBLIC_API_URL = https://SUA_URL_RAILWAY.up.railway.app/api
```

Substitua `SUA_URL_RAILWAY` pela URL da sua API no Railway.

---

### Step 6.3: Deploy

```
Click "Deploy"
Aguarde 2-3 minutos
```

✅ **Frontend no ar!**

---

### Step 6.4: Atualizar CORS

Volte no Railway e atualize a variável:

```
1. Serviço da API → Variables
2. Edite CORS_ORIGIN
3. Mude de "*" para a URL do Vercel
   Exemplo: https://finance-blog-web.vercel.app
4. Salve (vai fazer redeploy automático)
```

---

## 🎉 PRONTO! APLICAÇÃO NO AR!

### URLs:

- **API**: https://seu-app.up.railway.app
- **Frontend**: https://seu-app.vercel.app (se fez parte 6)

### Credenciais de Teste (se fez seed):

```
Email: admin@financeblog.com
Senha: admin123
Role: admin

Email: editor@financeblog.com
Senha: admin123
Role: editor

Email: user@financeblog.com
Senha: admin123
Role: user
```

⚠️ **Mude essas senhas em produção!**

---

## 🐛 TROUBLESHOOTING

### Problema: Build Failed - "pnpm not found"

**Solução:** Isso não deve acontecer mais (configuramos para usar npm).

Se acontecer:
```
1. Settings → Environment Variables
2. Adicione:
   NIXPACKS_INSTALL_CMD = npm install
   NIXPACKS_BUILD_CMD = npm run build
3. Redeploy
```

---

### Problema: "Cannot connect to database"

**Verificar:**
```bash
# Ver variáveis
railway variables

# Testar DATABASE_URL
railway run -- node -e "console.log(process.env.DATABASE_URL)"
```

**Solução:**
- DATABASE_URL deve começar com `mysql://`
- Copie novamente do serviço MySQL
- Certifique-se que não tem espaços extras

---

### Problema: "JWT_SECRET is required"

**Solução:**
- Você esqueceu de adicionar JWT_SECRET ou JWT_REFRESH_SECRET
- Volte na Parte 2.4 e adicione

---

### Problema: Deploy fica "Building" por muito tempo

**Solução:**
```
1. Cancel o deployment
2. Settings → Verificar Root Directory = apps/api
3. Fazer deploy de novo
```

---

### Problema: "Module not found"

**Logs mostram:**
```
Error: Cannot find module 'express'
```

**Solução:**
```
1. Verifique se package.json tem todas as dependências
2. Force reinstall:
   railway run npm install
3. Redeploy
```

---

### Problema: Porta errada

**Logs mostram:**
```
Error: listen EADDRINUSE :::3000
```

**Solução:**
- Verifique se variável PORT = 3001
- Railway usa variável PORT automática, mas nossa app espera 3001

---

### Problema: Railway CLI não funciona

**"railway: command not found"**

**Solução:**
```bash
# Linux/Mac
sudo npm install -g @railway/cli

# Windows (Admin)
npm install -g @railway/cli

# Verificar
which railway  # ou: where railway (Windows)
```

---

## 📊 COMANDOS ÚTEIS

### Ver logs em tempo real:

```bash
railway logs --follow
```

### Ver status:

```bash
railway status
```

### Ver variáveis:

```bash
railway variables
```

### Conectar ao MySQL:

```bash
railway connect
```

### Executar comando no Railway:

```bash
railway run -- [seu comando]

# Exemplos:
railway run -- npm run db:push
railway run -- node -v
railway run -- ls -la
```

### Forçar novo deploy:

```bash
railway up --force
```

---

## 🔐 SEGURANÇA

### Depois do deploy:

1. **Mude as senhas de teste:**
   - Não use admin123 em produção!

2. **Configure CORS corretamente:**
   - Troque `*` pela URL exata do frontend

3. **Ative 2FA no Railway:**
   - Settings → Security → Two-Factor Auth

4. **Faça backups:**
   - Configure backup automático do MySQL

---

## 📈 MONITORAMENTO

### Verificar saúde da aplicação:

```bash
# Health check
curl https://sua-url.up.railway.app/health

# Métricas
curl https://sua-url.up.railway.app/metrics
```

### Dashboard do Railway:

- Ver uso de recursos
- CPU, RAM, Network
- Custos acumulados

---

## 💰 CUSTOS

### Railway Free Tier:

- $5 de crédito/mês
- 500 horas de execução
- Depois: $0.000463/GB-second

### Estimativa mensal:

- **Desenvolvimento:** $0-5/mês (grátis)
- **Produção baixo tráfego:** $5-15/mês
- **Produção médio tráfego:** $15-30/mês

---

## 🚀 PRÓXIMOS PASSOS

Depois que tudo estiver funcionando:

1. [ ] Configurar domínio customizado
2. [ ] Adicionar SSL (automático no Railway)
3. [ ] Configurar Sentry para error tracking
4. [ ] Adicionar monitoring (UptimeRobot)
5. [ ] Configurar backups automáticos
6. [ ] Implementar CI/CD completo

---

## 📚 LINKS ÚTEIS

- **Railway Dashboard:** https://railway.app/dashboard
- **Railway Docs:** https://docs.railway.app
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Gerar Secrets:** https://generate-secret.vercel.app/32
- **Suporte Railway:** https://discord.gg/railway

---

## ✅ CHECKLIST FINAL

- [ ] ✅ MySQL criado no Railway
- [ ] ✅ Redis criado no Railway
- [ ] ✅ API conectada ao GitHub
- [ ] ✅ Root Directory configurado (apps/api)
- [ ] ✅ 12 variáveis de ambiente adicionadas
- [ ] ✅ Deploy bem-sucedido (logs OK)
- [ ] ✅ Migrações executadas (tabelas criadas)
- [ ] ✅ Health check funcionando (/health retorna OK)
- [ ] ✅ Endpoints respondendo
- [ ] ✅ (Opcional) Frontend deployed na Vercel
- [ ] ✅ (Opcional) CORS configurado com URL do frontend

---

## 🎓 RESUMO EXECUTIVO

**O que fizemos:**

1. Criamos MySQL e Redis no Railway
2. Conectamos a API ao GitHub
3. Configuramos 12 variáveis de ambiente
4. Fizemos deploy automático
5. Executamos migrações do banco
6. Testamos e confirmamos funcionamento

**Tempo total:** 15-20 minutos

**Resultado:** API rodando em produção no Railway! 🚀

---

**Problemas? Dúvidas?**

Veja os logs com `railway logs` e procure a mensagem de erro na seção TROUBLESHOOTING.

**BOA SORTE! 🎉**
