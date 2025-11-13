# 🗄️ Como Executar Migrações no Railway (Ponto 4)

## O que são Migrações?

Migrações criam as **tabelas no banco de dados**. Sem elas, seu banco está vazio!

Você precisa criar tabelas para:
- `users` (usuários)
- `articles` (artigos)
- `categories` (categorias)
- `comments` (comentários)

---

## 🎯 Duas Formas de Fazer

### Forma 1: Via Railway CLI (Recomendada) ⭐

**Mais confiável e você vê o que acontece!**

### Forma 2: Via Railway Dashboard

**Mais visual, mas às vezes não funciona bem**

---

## 📦 Forma 1: Via Railway CLI (Passo a Passo)

### Step 1: Instalar Railway CLI

**No seu computador**, abra o terminal e execute:

```bash
npm install -g @railway/cli
```

Aguarde a instalação terminar (1-2 minutos).

**Verificar instalação:**
```bash
railway --version
```

Deve mostrar algo como: `railway version 3.x.x`

---

### Step 2: Fazer Login na Railway

```bash
railway login
```

Isso vai:
1. Abrir seu navegador
2. Pedir para você fazer login na Railway
3. Autorizar o CLI

**No terminal, deve aparecer:**
```
✓ Logged in as seu-email@exemplo.com
```

---

### Step 3: Navegar até a pasta da API

**No terminal:**

```bash
# Vá para a pasta do projeto
cd /caminho/para/FINANCEOK

# Entre na pasta da API
cd apps/api
```

**Confirme que está no lugar certo:**
```bash
# Liste os arquivos (deve ver package.json, src/, etc)
ls

# Deve ver algo como:
# package.json  src/  drizzle.config.ts  tsconfig.json
```

---

### Step 4: Conectar ao Projeto Railway

```bash
railway link
```

Isso vai perguntar:
```
? Select a project:
  > finance-blog-api
    outro-projeto
    ...
```

**Use as setas ↑↓** para selecionar `finance-blog-api` (ou o nome que você deu).
**Pressione Enter**.

Deve aparecer:
```
✓ Linked to finance-blog-api
```

---

### Step 5: Executar as Migrações 🚀

Agora vem a parte importante!

**Opção A: Push direto (mais rápido)**

```bash
railway run pnpm db:push
```

Isso vai:
1. Conectar ao banco de dados da Railway
2. Criar todas as tabelas automaticamente
3. Sincronizar o schema

**Você verá algo como:**
```
Pushing schema to database...
✓ Created table 'users'
✓ Created table 'categories'
✓ Created table 'articles'
✓ Created table 'comments'
Done!
```

**Opção B: Migrations formais (mais profissional)**

```bash
# 1. Gerar arquivos de migration
railway run pnpm db:generate

# Isso cria arquivos em src/database/migrations/

# 2. Executar as migrations
railway run pnpm db:migrate
```

---

### Step 6: Inserir Dados Iniciais (Seed) - Opcional

Se quiser ter dados de exemplo (usuários e categorias):

```bash
railway run pnpm db:seed
```

Isso vai criar:

**3 Usuários de teste:**
```
admin@financeblog.com / senha: admin123 (role: admin)
editor@financeblog.com / senha: admin123 (role: editor)
user@financeblog.com / senha: admin123 (role: user)
```

**5 Categorias:**
- Investments
- Personal Finance
- Cryptocurrency
- Stock Market
- Real Estate

**Você verá:**
```
Starting database seeding...
✓ Users seeded successfully
✓ Categories seeded successfully
Database seeding completed!
```

---

## 🖥️ Forma 2: Via Railway Dashboard

Se não quiser instalar o CLI, pode tentar pelo dashboard:

### Step 1: Acessar o Shell

```
1. Vá no Railway Dashboard
2. Clique no serviço "finance-blog-api"
3. Procure por "Shell" ou "Terminal" (pode estar em Settings ou Tools)
4. Click para abrir
```

### Step 2: Executar Comandos

No shell que abriu, digite:

```bash
# Navegar para a pasta certa
cd /app

# Executar migrations
pnpm db:push

# Se quiser seed
pnpm db:seed
```

⚠️ **NOTA**: Nem sempre o shell está disponível ou funciona bem. Se der erro, use a Forma 1 (CLI).

---

## ✅ Como Saber se Funcionou?

### Verificar via Railway Dashboard:

```
1. Vá no serviço MySQL
2. Procure "Data" ou "Database Browser"
3. Você deve ver as tabelas:
   - users
   - categories
   - articles
   - comments
```

### Verificar via CLI:

```bash
# Conectar ao banco
railway connect

# Listar tabelas
SHOW TABLES;

# Deve mostrar:
# +----------------------------+
# | Tables_in_railway          |
# +----------------------------+
# | articles                   |
# | categories                 |
# | users                      |
# | comments                   |
# +----------------------------+

# Ver estrutura de uma tabela
DESCRIBE users;

# Sair
exit
```

### Verificar pela API:

Depois que a API estiver rodando:

```bash
# Tentar criar um usuário pela API
curl -X POST https://sua-api.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "username": "teste",
    "password": "Senha123!"
  }'
```

Se retornar sucesso, as tabelas existem! 🎉

---

## ❓ Dúvidas Comuns

### "Command not found: railway"

O CLI não foi instalado corretamente.

**Solução:**
```bash
# Tente instalar de novo
npm install -g @railway/cli

# Ou com sudo (Linux/Mac)
sudo npm install -g @railway/cli

# Verificar instalação
which railway
```

### "Cannot find project"

Você não está linkado ao projeto certo.

**Solução:**
```bash
# Deslinkar
railway unlink

# Linkar de novo
railway link

# Selecione o projeto correto
```

### "Error: DATABASE_URL not found"

As variáveis de ambiente não estão configuradas.

**Solução:**
1. Volte ao Ponto 3
2. Configure DATABASE_URL
3. Aguarde redeploy
4. Tente de novo

### "pnpm: command not found"

O Railway está tentando usar pnpm mas não tem instalado.

**Solução A: Forçar instalação**
```bash
railway run npm install -g pnpm
railway run pnpm db:push
```

**Solução B: Usar npm**
```bash
railway run npm run db:push
```

### "Connection refused" ou "ECONNREFUSED"

Não consegue conectar ao banco.

**Verificar:**
1. DATABASE_URL está correta? (veja no Ponto 3)
2. O serviço MySQL está rodando? (veja no Dashboard)
3. Aguarde 1-2 minutos e tente de novo

---

## 🔧 Troubleshooting Avançado

### Ver logs detalhados:

```bash
railway logs
```

Isso mostra os logs da sua aplicação. Procure por erros.

### Testar conexão com o banco:

```bash
railway run -- node -e "console.log(process.env.DATABASE_URL)"
```

Deve mostrar sua DATABASE_URL completa.

### Executar migration manualmente:

```bash
# Entrar no shell
railway shell

# Navegar
cd /app/apps/api

# Ver arquivos
ls src/database/

# Executar
npx drizzle-kit push
```

---

## 📊 O que Acontece Depois?

Depois de executar as migrations com sucesso:

1. ✅ Tabelas estão criadas no MySQL
2. ✅ API pode inserir/ler dados
3. ✅ Você pode testar endpoints
4. ✅ Pode prosseguir para o Step 5 (testar API)

---

## 💡 Dicas Pro

### Sempre que mudar o schema:

Se você modificar os arquivos em `src/database/schema/`, execute de novo:

```bash
railway run pnpm db:push
```

Isso sincroniza as mudanças.

### Fazer backup antes de migrations:

```bash
# Exportar dados atuais
railway run -- mysqldump > backup.sql

# Fazer migration
railway run pnpm db:push

# Se der erro, restaurar
railway run -- mysql < backup.sql
```

### Ver o que vai mudar antes de aplicar:

```bash
# Gerar SQL sem executar
railway run pnpm db:generate

# Ver o SQL gerado em src/database/migrations/
```

---

## 🎯 Resumo Executivo

**O que você PRECISA fazer:**

```bash
# 1. Instalar CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Ir para apps/api
cd apps/api

# 4. Linkar ao projeto
railway link

# 5. Criar tabelas
railway run pnpm db:push

# 6. Inserir dados de exemplo (opcional)
railway run pnpm db:seed
```

**Tempo total:** 5-10 minutos

**Resultado:** Banco de dados pronto para uso! 🎉

---

**Voltar**: [← Ponto 3: Variáveis de Ambiente](./RAILWAY-ENV-VARS.md)
**Próximo**: [Ponto 5: Testar API →](../deployment/railway-vercel.md#step-5-testar-a-api)
