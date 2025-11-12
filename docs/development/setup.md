# Development Setup Guide

## Prerequisites

Ensure you have the following installed:

- **Node.js** >= 20.0.0
- **pnpm** >= 8.0.0
- **Docker** and **Docker Compose**
- **Git**

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/finance-blog.git
cd finance-blog
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Copy environment files:

```bash
# Web app
cp apps/web/.env.example apps/web/.env.local

# API
cp apps/api/.env.example apps/api/.env.development

# Docker
cp infrastructure/docker/.env.example infrastructure/docker/.env
```

Edit the files and fill in your local configuration.

### 4. Start Infrastructure

Start MySQL and Redis using Docker:

```bash
cd infrastructure/docker
docker-compose up -d mysql redis
```

### 5. Database Setup

Run migrations and seed data:

```bash
pnpm --filter @finance-blog/api db:migrate
pnpm --filter @finance-blog/api db:seed
```

### 6. Start Development Servers

```bash
pnpm dev
```

This will start:
- Web app at http://localhost:3000
- API at http://localhost:3001

## IDE Setup

### VS Code Extensions

Recommended extensions:

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Prisma/Drizzle

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Development Workflow

### Working with Monorepo

```bash
# Run command in specific package
pnpm --filter @finance-blog/web dev

# Run command in all packages
pnpm -r build

# Add dependency to specific package
pnpm --filter @finance-blog/api add express
```

### Database Changes

```bash
# Make schema changes in src/database/schema/

# Push changes to database
pnpm --filter @finance-blog/api db:push

# Generate migration
pnpm --filter @finance-blog/api db:migrate

# View database in Drizzle Studio
pnpm --filter @finance-blog/api db:studio
```

### Testing

```bash
# Run all tests
pnpm test

# Run unit tests
pnpm test:unit

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm --filter @finance-blog/api test src/modules/auth/auth.test.ts
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Issues

1. Check if MySQL is running:
```bash
docker ps | grep mysql
```

2. Check connection string in `.env.development`

3. Try connecting manually:
```bash
mysql -h localhost -u root -p
```

### Node Modules Issues

```bash
# Clean install
pnpm clean
pnpm install
```

### Type Errors

```bash
# Rebuild types
pnpm --filter @finance-blog/types build

# Check types
pnpm type-check
```

## Useful Commands

```bash
# Clean all build artifacts
pnpm clean

# Format all code
pnpm format

# Lint all code
pnpm lint

# Check for outdated dependencies
pnpm outdated

# Update dependencies
pnpm update
```

## Next Steps

- Read the [Contributing Guide](./contributing.md)
- Check the [API Documentation](../api/openapi.yaml)
- Review [Architecture Documentation](../architecture/system-design.md)
