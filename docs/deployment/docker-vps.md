# Deploy Guide - Docker em VPS (DigitalOcean/AWS/Hetzner)

## 📋 Overview

- **Plataforma**: Qualquer VPS com Docker
- **Controle**: Total sobre infraestrutura
- **Escalabilidade**: Alta
- **Recomendado para**: Produção profissional
- **Cost**: $5-20/mês (dependendo do VPS)

---

## 🖥️ Opções de VPS

### DigitalOcean (Recomendado) ⭐
- **Droplet Básico**: $6/mês (1GB RAM, 25GB SSD)
- **Droplet Standard**: $12/mês (2GB RAM, 50GB SSD)
- Link: https://www.digitalocean.com

### Hetzner (Melhor custo-benefício)
- **CX11**: €4.15/mês (~$4.50) - 2GB RAM, 20GB SSD
- **CX21**: €5.83/mês (~$6.30) - 4GB RAM, 40GB SSD
- Link: https://www.hetzner.com

### AWS Lightsail
- **1GB**: $5/mês
- **2GB**: $10/mês
- Link: https://aws.amazon.com/lightsail

---

## 🚀 Deploy Passo a Passo

### Step 1: Criar VPS

#### DigitalOcean:
```bash
1. Criar conta em digitalocean.com
2. Create → Droplets
3. Escolher:
   - Ubuntu 22.04 LTS
   - Basic Plan - $12/mês (2GB RAM)
   - Datacenter Region: New York/Frankfurt
   - SSH Key (criar ou usar existente)
4. Create Droplet
```

Anote o **IP público** do droplet.

### Step 2: Configurar Servidor

```bash
# Conectar via SSH
ssh root@YOUR_SERVER_IP

# Atualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt install docker-compose -y

# Verificar instalação
docker --version
docker-compose --version
```

### Step 3: Configurar Firewall

```bash
# Permitir SSH, HTTP e HTTPS
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status
```

### Step 4: Clonar Projeto

```bash
# Instalar Git
apt install git -y

# Criar usuário para a aplicação
adduser appuser
usermod -aG docker appuser
su - appuser

# Clonar repositório
git clone https://github.com/YOUR_USERNAME/FINANCEOK.git
cd FINANCEOK
```

### Step 5: Configurar Environment

```bash
# Copiar e editar .env
cd infrastructure/docker
cp .env.example .env
nano .env
```

Editar com suas configurações:

```env
# Environment
NODE_ENV=production

# Database
DB_ROOT_PASSWORD=GENERATE_STRONG_PASSWORD_HERE
DB_NAME=finance_blog
DB_USER=finance_user
DB_PASSWORD=GENERATE_STRONG_PASSWORD_HERE
DB_PORT=3306

# Redis
REDIS_PORT=6379

# API
API_PORT=3001
JWT_SECRET=GENERATE_SECURE_RANDOM_STRING
JWT_REFRESH_SECRET=GENERATE_ANOTHER_SECURE_STRING
CORS_ORIGIN=https://your-domain.com

# Web
WEB_PORT=3000
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api

# Grafana
GRAFANA_PASSWORD=GENERATE_PASSWORD
```

### Step 6: Build e Deploy

```bash
# Build das imagens
docker-compose build

# Iniciar serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver status
docker-compose ps
```

### Step 7: Executar Migrações

```bash
# Acessar container da API
docker-compose exec api sh

# Dentro do container
pnpm db:migrate
pnpm db:seed

# Sair
exit
```

### Step 8: Configurar Nginx (Reverse Proxy)

```bash
# Instalar Nginx (fora do Docker)
apt install nginx -y

# Criar configuração
nano /etc/nginx/sites-available/finance-blog
```

Adicionar:

```nginx
# API
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Ativar configuração
ln -s /etc/nginx/sites-available/finance-blog /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 9: Configurar SSL (Let's Encrypt)

```bash
# Instalar Certbot
apt install certbot python3-certbot-nginx -y

# Obter certificados SSL
certbot --nginx -d your-domain.com -d www.your-domain.com
certbot --nginx -d api.your-domain.com

# Auto-renovação (já configurado automaticamente)
certbot renew --dry-run
```

### Step 10: Configurar Domínio

No seu provedor de domínio (Namecheap, GoDaddy, etc):

```dns
# Adicionar DNS records:
Type    Name    Value               TTL
A       @       YOUR_SERVER_IP      300
A       www     YOUR_SERVER_IP      300
A       api     YOUR_SERVER_IP      300
```

Aguarde propagação DNS (5-30 minutos).

---

## 🔄 Deploy Automático com GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd ~/FINANCEOK
            git pull origin main
            cd infrastructure/docker
            docker-compose build
            docker-compose up -d
            docker-compose exec -T api pnpm db:migrate
```

Adicione secrets no GitHub:
- `VPS_HOST`: IP do servidor
- `VPS_USER`: appuser
- `VPS_SSH_KEY`: Chave SSH privada

---

## 📊 Monitoramento

### Acessar serviços:

- **Frontend**: https://your-domain.com
- **API**: https://api.your-domain.com
- **Health**: https://api.your-domain.com/health
- **Metrics**: https://api.your-domain.com/metrics
- **Grafana**: http://YOUR_IP:3002

### Ver logs:

```bash
# Todos os serviços
docker-compose logs -f

# Apenas API
docker-compose logs -f api

# Apenas Web
docker-compose logs -f web

# Últimas 100 linhas
docker-compose logs --tail=100 api
```

### Monitorar recursos:

```bash
# Ver uso de recursos
docker stats

# Ver todos os containers
docker ps -a
```

---

## 🔧 Manutenção

### Backup do Banco de Dados

```bash
# Criar script de backup
nano ~/backup-db.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/appuser/backups"
mkdir -p $BACKUP_DIR

docker-compose exec -T mysql mysqldump \
  -u finance_user \
  -p$DB_PASSWORD \
  finance_blog > $BACKUP_DIR/backup_$DATE.sql

# Manter apenas últimos 7 dias
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete

echo "Backup completed: backup_$DATE.sql"
```

```bash
chmod +x ~/backup-db.sh

# Adicionar ao crontab (diário às 2am)
crontab -e
```

Adicionar linha:
```
0 2 * * * /home/appuser/backup-db.sh
```

### Atualizar Aplicação

```bash
cd ~/FINANCEOK
git pull origin main
cd infrastructure/docker
docker-compose build
docker-compose up -d
```

### Reiniciar Serviços

```bash
# Reiniciar tudo
docker-compose restart

# Reiniciar apenas API
docker-compose restart api

# Parar tudo
docker-compose down

# Iniciar tudo
docker-compose up -d
```

---

## 💰 Custos

### DigitalOcean ($12/mês)
- 2GB RAM
- 50GB SSD
- 2TB Transfer
- **Total**: ~$12/mês

### Domínio (~$10/ano)
- .com domain
- **Total**: ~$1/mês

### **Custo Total**: ~$13-15/mês

---

## 🚀 Escalabilidade

### Quando escalar:

1. **Adicionar mais RAM**: Resize droplet
2. **Load Balancer**: DigitalOcean Load Balancer ($12/mês)
3. **Managed Database**: DigitalOcean Managed MySQL ($15/mês)
4. **CDN**: Cloudflare (grátis) ou DigitalOcean Spaces + CDN

### Kubernetes (Futuro):

Quando crescer muito, migre para Kubernetes usando os manifests em `infrastructure/kubernetes/`

---

## ✅ Checklist Final

- [ ] VPS criado e configurado
- [ ] Docker instalado
- [ ] Projeto clonado
- [ ] Environment configurado
- [ ] Serviços rodando
- [ ] Nginx configurado
- [ ] SSL configurado
- [ ] Domínio apontando
- [ ] Backup configurado
- [ ] Monitoramento funcionando
- [ ] Deploy automático configurado

---

## 📚 Links Úteis

- DigitalOcean: https://www.digitalocean.com
- Hetzner: https://www.hetzner.com
- Let's Encrypt: https://letsencrypt.org
- Docker Docs: https://docs.docker.com
- Nginx Docs: https://nginx.org/en/docs
