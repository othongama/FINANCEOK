# ✅ Como Testar se a API Está Funcionando (Ponto 5)

## 🎯 O que vamos fazer

Depois de configurar tudo, precisamos verificar se a API está:
1. ✅ Rodando corretamente
2. ✅ Conectada ao banco de dados
3. ✅ Acessível pela internet

---

## 📍 Step 1: Encontrar a URL da sua API

### Onde está a URL?

**No Railway Dashboard:**

```
1. Vá para o Railway Dashboard (https://railway.app/dashboard)
2. Clique no seu projeto
3. Clique no serviço "finance-blog-api" (ou o nome que você deu)
4. Procure por uma seção chamada:
   - "Deployments" ou
   - "Settings" ou
   - "Domains"
```

### Como a URL se parece?

A Railway gera uma URL automática parecida com:

```
https://finance-blog-api-production-abc123.up.railway.app
```

Ou pode ser:

```
https://finance-blog-api.up.railway.app
```

### Não encontro a URL?

**Opção A: Aba Deployments**
```
1. Clique no serviço da API
2. Vá na aba "Deployments"
3. Clique no último deployment (o mais recente no topo)
4. A URL aparece ali
```

**Opção B: Aba Settings**
```
1. Clique no serviço da API
2. Vá em "Settings"
3. Procure por "Domains" ou "Public URL"
4. A URL estará lá
```

**Opção C: Via Railway CLI**
```bash
cd apps/api
railway status

# Vai mostrar:
# Service: finance-blog-api
# URL: https://finance-blog-api-production-abc123.up.railway.app
```

---

## 🧪 Step 2: Testar o Health Check

O health check é um endpoint simples que verifica se a API está viva.

### Método 1: Pelo Navegador (Mais Fácil) ⭐

```
1. Copie sua URL da Railway
2. Adicione /health no final
3. Cole no navegador

Exemplo:
https://finance-blog-api-production-abc123.up.railway.app/health
```

**O que você DEVE ver:**

Uma página com JSON assim:

```json
{
  "status": "ok",
  "timestamp": "2024-11-12T15:30:45.123Z",
  "uptime": 123.456,
  "environment": "production"
}
```

✅ **Se viu isso, PARABÉNS! Sua API está funcionando!** 🎉

### Método 2: Pelo Terminal (cURL)

Se você prefere terminal:

```bash
# Substitua SUA_URL pela URL da Railway
curl https://SUA_URL.up.railway.app/health

# Exemplo:
curl https://finance-blog-api-production-abc123.up.railway.app/health
```

**Resposta esperada:**
```json
{"status":"ok","timestamp":"2024-11-12T15:30:45.123Z","uptime":123.456,"environment":"production"}
```

### Método 3: Ferramentas Online

Use sites como:
- **Postman**: https://postman.com
- **Insomnia**: https://insomnia.rest
- **HTTPie**: https://httpie.io/app

```
GET https://SUA_URL.up.railway.app/health
```

---

## 🔍 Step 3: Verificar os Logs

Sempre bom ver o que está acontecendo nos bastidores!

### Via Railway Dashboard:

```
1. No serviço da API
2. Vá na aba "Deployments"
3. Clique no deployment ativo (tem uma bolinha verde)
4. Click em "View Logs" ou "Logs"
```

**O que procurar nos logs:**

✅ **Logs BONS (tudo funcionando):**
```
🚀 Server running on port 3001 in production mode
📊 Metrics available at http://localhost:3001/metrics
💚 Health check at http://localhost:3001/health
Database connection established successfully
```

❌ **Logs RUINS (tem problema):**
```
Error: Cannot connect to database
Error: JWT_SECRET is required
Error: Redis connection failed
ECONNREFUSED
```

### Via Railway CLI:

```bash
cd apps/api
railway logs

# Ver logs em tempo real (atualiza automaticamente)
railway logs --follow
```

Pressione `Ctrl+C` para sair.

---

## 🧰 Step 4: Testar Outros Endpoints

Se o health check funcionou, teste outros endpoints:

### Endpoint: Listar Artigos

```bash
# Pelo navegador:
https://SUA_URL.up.railway.app/api/articles

# Pelo terminal:
curl https://SUA_URL.up.railway.app/api/articles
```

**Resposta esperada:**
```json
{
  "message": "List articles endpoint - To be implemented",
  "data": []
}
```

### Endpoint: Métricas (Prometheus)

```bash
# Pelo navegador:
https://SUA_URL.up.railway.app/metrics
```

**Resposta esperada:**
Vai mostrar várias métricas como:
```
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",route="/health",status_code="200"} 5
...
```

---

## ❌ Problemas Comuns e Soluções

### Problema 1: "Cannot GET /health" ou 404

**Causa:** A URL está errada ou a API não está rodando.

**Solução:**
```
1. Verifique se copiou a URL correta
2. Certifique-se que adicionou /health no final
3. Veja os logs (pode ter erro no startup)
```

---

### Problema 2: "Application failed to respond"

**Causa:** A API não conseguiu iniciar.

**Solução:**
```
1. Ver logs no Railway
2. Procurar por erros (DATABASE_URL, JWT_SECRET, etc)
3. Verificar se todas as variáveis estão configuradas (Ponto 3)
4. Fazer redeploy:
   Railway → Deployments → ⋮ → Redeploy
```

---

### Problema 3: Demora muito e depois dá timeout

**Causa:** Railway está fazendo build ou a API está lenta para iniciar.

**Solução:**
```
1. Aguarde 2-3 minutos (primeira vez pode demorar)
2. Veja os logs para ver o que está acontecendo
3. Se demorar mais de 5 minutos, tem algo errado
```

---

### Problema 4: "Internal Server Error" (500)

**Causa:** Erro dentro da aplicação.

**Logs típicos:**
```
Error: Cannot connect to database
Error: config.jwt.secret is undefined
```

**Solução:**
```
1. Ver logs detalhados
2. Verificar variáveis de ambiente (Ponto 3)
3. Verificar DATABASE_URL especificamente
4. Testar conexão com banco:
   railway run -- node -e "console.log(process.env.DATABASE_URL)"
```

---

### Problema 5: Página em branco ou "This site can't be reached"

**Causa:** URL incorreta ou serviço não existe.

**Solução:**
```
1. Copie a URL de novo do Railway (cuidado com copy/paste)
2. Verifique se o deployment está ativo (bolinha verde)
3. Tente acessar só a URL base (sem /health) - deve dar 404 mas carregar
```

---

### Problema 6: CORS Error (ao testar do frontend)

**Isso é NORMAL por enquanto!** Você vai resolver no Ponto 7.

```
Access to fetch at 'https://api...' has been blocked by CORS policy
```

**Não se preocupe ainda.** Quando configurar o CORS no Ponto 7, isso resolve.

---

## 🔧 Comandos Úteis de Debugging

### Ver todas as variáveis de ambiente:

```bash
railway variables
```

### Ver status do serviço:

```bash
railway status
```

### Conectar ao banco de dados:

```bash
railway connect
```

Isso abre o MySQL. Você pode verificar se as tabelas existem:

```sql
SHOW TABLES;
```

### Forçar redeploy:

```bash
railway up --force
```

Ou no Dashboard: Deployments → ⋮ → Redeploy

---

## ✅ Checklist de Verificação

Use esta lista para garantir que tudo está OK:

- [ ] ✅ Consegui encontrar a URL da API
- [ ] ✅ O endpoint /health retorna `{"status":"ok",...}`
- [ ] ✅ Os logs mostram "Server running on port 3001"
- [ ] ✅ Os logs mostram "Database connection established"
- [ ] ✅ Não há erros vermelhos nos logs
- [ ] ✅ O endpoint /api/articles responde (mesmo que vazio)
- [ ] ✅ O endpoint /metrics mostra métricas

**Se marcou todos ✅: Parabéns! Sua API está 100% funcional!** 🎉

---

## 📊 Entendendo a Resposta do Health Check

Quando você acessa `/health`, recebe:

```json
{
  "status": "ok",           // ← API está viva
  "timestamp": "2024-...",  // ← Hora atual no servidor
  "uptime": 123.456,        // ← Segundos que está rodando
  "environment": "production" // ← Ambiente de execução
}
```

**Significado:**
- `status: "ok"` = Tudo funcionando
- `uptime` = Quanto tempo a API está rodando sem reiniciar
- `environment` = Confirma que está em produção

---

## 🎯 Próximos Passos

Depois que confirmar que a API está funcionando:

**✅ Ponto 5 OK? → Vá para o Ponto 6!**

Ponto 6 é fazer o deploy do frontend na Vercel (mais fácil ainda!).

---

## 💡 Dicas Pro

### Salvar a URL da API

Salve num arquivo local para referência:

```bash
# Criar arquivo de referência (não committar!)
echo "API_URL=https://sua-url.up.railway.app" > .api-url
```

### Adicionar ao favoritos do navegador

Adicione estes favoritos:
- `[Railway] API Health` → https://sua-url.up.railway.app/health
- `[Railway] API Metrics` → https://sua-url.up.railway.app/metrics
- `[Railway] Dashboard` → https://railway.app/dashboard

### Monitorar uptime

Use serviços como:
- **UptimeRobot** (grátis): https://uptimerobot.com
- **Pingdom** (grátis): https://www.pingdom.com

Configure para checar sua URL/health a cada 5 minutos.

---

## 🆘 Ainda não funciona?

Se depois de tudo isso ainda não está funcionando:

### 1. Compartilhe os logs

```bash
railway logs > logs.txt
```

Veja o arquivo `logs.txt` e procure por linhas com `Error` ou `FATAL`.

### 2. Verifique cada ponto anterior

- ✅ Ponto 3: Todas variáveis configuradas?
- ✅ Ponto 4: Migrations executadas com sucesso?

### 3. Redeploy completo

```bash
# Force um novo deploy
railway up --force

# Ou via dashboard:
# Deployments → ⋮ → Redeploy
```

### 4. Verifique se o build passou

```
Railway → Deployments → Último deployment

Status deve estar:
✅ SUCCESS (verde)

Não deve estar:
❌ FAILED (vermelho)
⚠️ BUILDING (amarelo, ainda processando)
```

---

## 📚 Resumo Visual

```
Você está aqui:

Ponto 1 ✅ → Criar Redis
Ponto 2 ✅ → Deploy API
Ponto 3 ✅ → Variáveis
Ponto 4 ✅ → Migrações
Ponto 5 🎯 → TESTAR API ← Você está aqui!
Ponto 6 ⏭️ → Deploy Frontend
Ponto 7 ⏭️ → Configurar CORS
```

**Objetivo do Ponto 5:**
Confirmar que a API está funcionando antes de fazer deploy do frontend.

**Como saber que passou:**
Acessar https://sua-url.up.railway.app/health retorna JSON com "status": "ok"

---

**Voltar**: [← Ponto 4: Migrações](./RAILWAY-MIGRATIONS.md)
**Próximo**: [Ponto 6: Deploy Frontend →](./RAILWAY-QUICKSTART.md#step-6-deploy-do-frontend-na-vercel-3-minutos)

---

**Ainda com dúvida?** Me diga exatamente o que está acontecendo:
- Qual erro aparece?
- O que você vê quando acessa a URL?
- Consegue ver os logs?
