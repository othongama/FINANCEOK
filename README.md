# 🏢 Finance Blog - Professional Architecture

A professional, scalable, and production-ready finance blog platform built with modern web technologies and best practices.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)

## ✨ Features

- 🏗️ **Monorepo Structure** - Organized with Turborepo and pnpm workspaces
- 🚀 **Next.js 14** - React framework with App Router
- ⚡ **Express API** - Fast and minimal backend
- 🗄️ **MySQL + Drizzle ORM** - Type-safe database operations
- 🔄 **Redis Caching** - High-performance caching layer
- 🔒 **Security First** - JWT auth, rate limiting, helmet, validation
- 📊 **Monitoring** - Prometheus metrics, Sentry error tracking, Winston logging
- 🐳 **Docker** - Containerized applications with docker-compose
- 🔄 **CI/CD** - GitHub Actions workflows
- 📝 **TypeScript** - Full type safety
- 🎨 **Tailwind CSS** - Utility-first styling
- 🧪 **Testing** - Unit, integration, and E2E tests

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **TanStack Query** - Data fetching
- **Zustand** - State management

### Backend
- **Express** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **MySQL** - Database
- **Redis** - Caching
- **JWT** - Authentication
- **Zod** - Validation

### DevOps
- **Docker** - Containerization
- **Nginx** - Reverse proxy
- **GitHub Actions** - CI/CD
- **Prometheus** - Metrics
- **Grafana** - Monitoring
- **Sentry** - Error tracking

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Load Balancer (Nginx)                    │
└───────┬──────────────────────────────────────────────────────┘
        │
        ├──────────────────────────────────────────────────────┐
        │                                                       │
┌───────▼────────┐                                 ┌───────────▼────────┐
│   Frontend     │                                 │    API Gateway     │
│   (Next.js)    │                                 │    (Express)       │
└────────────────┘                                 └────────┬───────────┘
                                                            │
                                                   ┌────────┴────────┐
                                                   │                 │
                                           ┌───────▼──────┐  ┌──────▼─────┐
                                           │   MySQL DB   │  │   Redis    │
                                           └──────────────┘  └────────────┘
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **pnpm** >= 8.0.0
- **Docker** and **Docker Compose** (for containerized setup)
- **MySQL** 8.0+ (if running locally)
- **Redis** 7+ (if running locally)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/finance-blog.git
cd finance-blog
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
# Copy example env files
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env.development
```

4. **Start services with Docker**

```bash
cd infrastructure/docker
cp .env.example .env
docker-compose up -d
```

5. **Run database migrations**

```bash
pnpm --filter @finance-blog/api db:migrate
pnpm --filter @finance-blog/api db:seed
```

6. **Start development servers**

```bash
pnpm dev
```

The application will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:3001
- API Docs: http://localhost:3001/api/docs
- Grafana: http://localhost:3002

## 💻 Development

### Project Structure

```
finance-blog/
├── apps/
│   ├── web/              # Next.js frontend
│   ├── api/              # Express backend
│   └── admin/            # Admin panel (optional)
├── packages/
│   ├── ui/               # Shared UI components
│   ├── types/            # Shared TypeScript types
│   ├── config/           # Shared configurations
│   └── utils/            # Shared utilities
├── infrastructure/
│   ├── docker/           # Docker configurations
│   ├── kubernetes/       # K8s manifests
│   └── terraform/        # Infrastructure as Code
├── docs/                 # Documentation
└── .github/              # GitHub Actions workflows
```

### Available Scripts

```bash
# Development
pnpm dev                  # Start all apps in dev mode
pnpm dev --filter web     # Start only web app
pnpm dev --filter api     # Start only API

# Building
pnpm build                # Build all apps
pnpm build --filter web   # Build only web app

# Testing
pnpm test                 # Run all tests
pnpm test:unit           # Run unit tests
pnpm test:integration    # Run integration tests
pnpm test:e2e            # Run E2E tests

# Linting & Formatting
pnpm lint                 # Lint all code
pnpm format              # Format all code
pnpm type-check          # Type check all code

# Database
pnpm --filter api db:push      # Push schema changes
pnpm --filter api db:migrate   # Run migrations
pnpm --filter api db:seed      # Seed database
pnpm --filter api db:studio    # Open Drizzle Studio
```

## 🧪 Testing

### Unit Tests

```bash
pnpm test:unit
```

### Integration Tests

```bash
pnpm test:integration
```

### E2E Tests

```bash
pnpm test:e2e
```

## 🚢 Deployment

### Using Docker

```bash
# Build images
docker-compose -f infrastructure/docker/docker-compose.yml build

# Start services
docker-compose -f infrastructure/docker/docker-compose.yml up -d
```

### Manual Deployment

```bash
# Build for production
pnpm build

# Start production servers
pnpm --filter api start
pnpm --filter web start
```

### Environment Variables

See individual `.env.example` files:
- [Web Environment Variables](./apps/web/.env.example)
- [API Environment Variables](./apps/api/.env.example)
- [Docker Environment Variables](./infrastructure/docker/.env.example)

## 📚 Documentation

- [Architecture Documentation](./docs/architecture/system-design.md)
- [API Documentation](./docs/api/openapi.yaml)
- [Development Guide](./docs/development/setup.md)
- [Deployment Guide](./docs/deployment/aws.md)
- [Contributing Guide](./docs/development/contributing.md)

## 🔐 Security

- JWT authentication with refresh tokens
- Rate limiting with Redis
- Input validation with Zod
- SQL injection prevention with Drizzle ORM
- XSS protection with Helmet
- CORS configuration
- Environment variable validation

## 📊 Monitoring

- **Prometheus** - Metrics collection at `/metrics`
- **Grafana** - Visualization dashboards at `:3002`
- **Sentry** - Error tracking and performance monitoring
- **Winston** - Application logging

## 🤝 Contributing

Please read our [Contributing Guide](./docs/development/contributing.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Architecture** - Professional, scalable, production-ready
- **Development** - Following industry best practices
- **DevOps** - Automated CI/CD pipelines

## 🌟 Features Roadmap

- [ ] OAuth2 authentication (Google, GitHub)
- [ ] Real-time notifications with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Progressive Web App (PWA)
- [ ] GraphQL API
- [ ] Mobile app (React Native)

## 📞 Support

For support, email support@financeblog.com or open an issue in the GitHub repository.

---

Built with ❤️ by the Finance Blog Team
