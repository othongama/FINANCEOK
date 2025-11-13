# 🔧 Como Configurar Variáveis de Ambiente na Railway

## Passo a Passo Visual

### 1. Acessar as Variáveis

```
Railway Dashboard
  ↓
Clique no seu serviço "finance-blog-api"
  ↓
Procure a aba "Variables" (ou "Variáveis")
  ↓
Clique nela
```

### 2. Adicionar CADA Variável

Para cada variável abaixo, clique em **"+ New Variable"** ou **"Add Variable"**:

---

#### Variável 1: NODE_ENV
```
Name (Nome):  NODE_ENV
Value (Valor): production
```
✅ Click "Add" ou pressione Enter

---

#### Variável 2: PORT
```
Name:  PORT
Value: 3001
```
✅ Click "Add"

---

#### Variável 3: DATABASE_URL

⚠️ **IMPORTANTE**: Esta provavelmente JÁ EXISTE se você conectou o MySQL!

**Como verificar:**
1. Vá na aba "Variables"
2. Procure por `DATABASE_URL`
3. Se já existir, **PULE ESTA** e vá para a próxima

**Se não existir:**
```
Name:  DATABASE_URL
Value: Copie do seu serviço MySQL na Railway
```

**Como copiar do MySQL:**
```
1. Volte ao Dashboard principal
2. Clique no serviço "MySQL" (ou o nome que você deu)
3. Vá na aba "Connect"
4. Procure por "MySQL Connection URL" ou "Connection String"
5. Copie a URL completa (começa com mysql://)
6. Cole no Value da variável DATABASE_URL
```

Exemplo de DATABASE_URL:
```
mysql://root:SuaSenhaAqui@containers-us-west-123.railway.app:7890/railway
```

---

#### Variável 4: REDIS_URL

Você vai copiar do Redis que criou no Step 1.

```
Name:  REDIS_URL
Value: [copiar do serviço Redis]
```

**Como copiar:**
```
1. Volte ao Dashboard
2. Clique no serviço "Redis"
3. Vá na aba "Connect"
4. Procure por "Redis Connection URL" ou "REDIS_URL"
5. Copie (começa com redis://)
6. Cole aqui
```

Exemplo:
```
redis://default:SuaSenhaAqui@containers-us-west-456.railway.app:6379
```

---

#### Variável 5: JWT_SECRET (IMPORTANTE!)

⚠️ **NÃO USE um secret de exemplo! Deve ser ÚNICO!**

**Como gerar um secret seguro:**

**Opção 1: Online (mais fácil)**
```
1. Abra: https://generate-secret.vercel.app/32
2. Copie o texto gerado (algo como: df8a6sd7f68asdf687asd6f8a7s6df8a7s6df)
3. Use como valor
```

**Opção 2: No terminal (se preferir)**
```bash
# No seu computador, execute:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Vai gerar algo como:
# 8f7a6sd5f4a3sd2f1a0sd9f8a7sd6f5a4sd3f2a1sd0f9a8sd7f6a5sd4f3a
```

**Configurar na Railway:**
```
Name:  JWT_SECRET
Value: [Cole o secret que você GEROU (não copie um de exemplo!)]
```

---

#### Variável 6: JWT_REFRESH_SECRET (IMPORTANTE!)

⚠️ **Deve ser DIFERENTE do JWT_SECRET!**

**Gere OUTRO secret:**
```
1. Abra novamente: https://generate-secret.vercel.app/32
2. Copie o NOVO texto gerado
3. Use como valor
```

```
Name:  JWT_REFRESH_SECRET
Value: [Cole o SEGUNDO secret que você gerou]
```

---

#### Variáveis 7 e 8: JWT Expirations
```
Name:  JWT_EXPIRES_IN
Value: 15m
```

```
Name:  JWT_REFRESH_EXPIRES_IN
Value: 7d
```

---

#### Variável 9: CORS_ORIGIN
```
Name:  CORS_ORIGIN
Value: *
```

⚠️ **NOTA**: Você vai mudar isso depois no Step 7 (quando tiver a URL do Vercel)

---

#### Variável 10: LOG_LEVEL
```
Name:  LOG_LEVEL
Value: info
```

---

#### Variáveis 11 e 12: Rate Limiting (Opcional mas recomendado)
```
Name:  RATE_LIMIT_WINDOW_MS
Value: 900000
```

```
Name:  RATE_LIMIT_MAX
Value: 100
```

---

## ✅ Checklist Final

Depois de adicionar todas, você deve ter ESTAS variáveis:

```
✅ NODE_ENV = production
✅ PORT = 3001
✅ DATABASE_URL = mysql://root:...
✅ REDIS_URL = redis://default:...
✅ JWT_SECRET = (seu secret único gerado)
✅ JWT_REFRESH_SECRET = (outro secret único)
✅ JWT_EXPIRES_IN = 15m
✅ JWT_REFRESH_EXPIRES_IN = 7d
✅ CORS_ORIGIN = *
✅ LOG_LEVEL = info
✅ RATE_LIMIT_WINDOW_MS = 900000 (opcional)
✅ RATE_LIMIT_MAX = 100 (opcional)
```

---

## 🔄 O que acontece depois?

Quando você terminar de adicionar as variáveis:
1. Railway detecta automaticamente
2. Faz **redeploy** da sua aplicação
3. Aguarde 1-2 minutos
4. A API estará rodando com as novas configurações!

---

## ❓ Dúvidas Comuns

### "Não encontro a aba Variables"

Possíveis nomes da aba:
- Variables
- Variáveis
- Environment Variables
- Environment
- Settings → Variables

### "Já existem algumas variáveis"

Normal! A Railway adiciona algumas automaticamente:
- `RAILWAY_*` (variáveis internas)
- `DATABASE_URL` (se você conectou o MySQL)

Mantenha essas e adicione as que faltam.

### "DATABASE_URL está diferente"

A Railway pode gerar em formatos diferentes:
```
✅ mysql://root:pass@host:port/railway
✅ mysql://user:pass@host:port/database
```

Ambos funcionam! Não precisa mudar.

---

## 🆘 Troubleshooting

### Erro: "JWT_SECRET is required"

Você esqueceu de adicionar JWT_SECRET ou JWT_REFRESH_SECRET.
Volte e adicione ambos.

### Erro: "Cannot connect to database"

Verifique se DATABASE_URL está correta:
1. Deve começar com `mysql://`
2. Deve ter usuário, senha, host, porta e database
3. Copie exatamente do serviço MySQL

### A API não faz redeploy

1. Force redeploy: No serviço da API → Deployments → "Redeploy"
2. Ou mude qualquer variável (adicione um espaço e remova) para forçar

---

## 💡 Dica Pro

Depois de configurar tudo, salve suas variáveis em um arquivo local (SEM COMMITAR):

```bash
# Crie um arquivo .env.railway (NO SEU COMPUTADOR, não commite!)
# Use para referência futura

NODE_ENV=production
PORT=3001
DATABASE_URL=mysql://...
# etc
```

Assim você tem um backup para referência!

---

**Próximo**: [Ponto 4 - Executar Migrações →](./RAILWAY-MIGRATIONS.md)
