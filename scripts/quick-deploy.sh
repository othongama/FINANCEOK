#!/bin/bash

# Finance Blog - Quick Deploy Script
# Este script ajuda a fazer deploy rápido na Railway ou Render

set -e

echo "🚀 Finance Blog - Quick Deploy"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

echo "Escolha a plataforma de deploy:"
echo ""
echo "1) Railway (Recomendado para iniciantes)"
echo "2) Render (All-in-One)"
echo "3) VPS com Docker (Avançado)"
echo "4) Sair"
echo ""
read -p "Opção [1-4]: " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}=== Deploy na Railway ===${NC}"
        echo ""
        echo "📚 Guia completo: docs/deployment/railway-vercel.md"
        echo ""

        # Check if Railway CLI is installed
        if ! command -v railway &> /dev/null; then
            echo -e "${YELLOW}Railway CLI não encontrado. Instalando...${NC}"
            npm install -g @railway/cli
        fi

        echo ""
        echo "✅ Railway CLI instalado"
        echo ""
        echo "Próximos passos:"
        echo "1. Execute: railway login"
        echo "2. Execute: railway init (na pasta apps/api)"
        echo "3. Configure as variáveis de ambiente"
        echo "4. Execute: railway up"
        echo ""
        echo "Ou siga o guia completo em: docs/deployment/railway-vercel.md"
        ;;

    2)
        echo ""
        echo -e "${BLUE}=== Deploy na Render ===${NC}"
        echo ""
        echo "📚 Guia completo: docs/deployment/render.md"
        echo ""
        echo "Passos rápidos:"
        echo "1. Acesse: https://render.com"
        echo "2. Conecte seu repositório GitHub"
        echo "3. Crie os serviços seguindo o guia"
        echo "4. Configure as variáveis de ambiente"
        echo ""
        echo "Ou use o render.yaml para deploy automático!"
        ;;

    3)
        echo ""
        echo -e "${BLUE}=== Deploy em VPS com Docker ===${NC}"
        echo ""
        echo "📚 Guia completo: docs/deployment/docker-vps.md"
        echo ""

        read -p "Você já tem um VPS configurado? [y/N]: " has_vps

        if [[ $has_vps =~ ^[Yy]$ ]]; then
            echo ""
            echo "Ótimo! Siga estas etapas:"
            echo ""
            echo "1. Conecte ao seu VPS via SSH"
            echo "2. Clone o repositório"
            echo "3. Configure o .env em infrastructure/docker/"
            echo "4. Execute: docker-compose up -d"
            echo ""
            echo "Guia completo: docs/deployment/docker-vps.md"
        else
            echo ""
            echo "Você precisa primeiro:"
            echo "1. Criar um VPS (DigitalOcean, Hetzner, etc)"
            echo "2. Instalar Docker"
            echo "3. Configurar firewall"
            echo ""
            echo "Siga o guia completo: docs/deployment/docker-vps.md"
        fi
        ;;

    4)
        echo "👋 Até logo!"
        exit 0
        ;;

    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}📚 Mais informações:${NC}"
echo "   docs/deployment/README.md"
echo ""
echo -e "${GREEN}Boa sorte com seu deploy! 🚀${NC}"
