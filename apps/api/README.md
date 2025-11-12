# Finance Blog - API

Express.js backend API for Finance Blog.

## Tech Stack

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **MySQL** - Database
- **Redis** - Caching
- **JWT** - Authentication
- **Zod** - Validation

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test

# Lint code
pnpm lint
```

## Database

```bash
# Push schema changes to database
pnpm db:push

# Generate migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed database
pnpm db:seed

# Open Drizzle Studio
pnpm db:studio
```

## Environment Variables

Copy `.env.example` to `.env.development` and fill in the values:

```bash
cp .env.example .env.development
```

## Project Structure

```
src/
├── core/            # Core configurations
│   ├── config/     # App configuration
│   ├── logger/     # Logging service
│   ├── metrics/    # Metrics collection
│   ├── middleware/ # Express middleware
│   └── sentry/     # Error tracking
├── modules/         # Feature modules
│   ├── auth/       # Authentication
│   ├── articles/   # Articles management
│   ├── users/      # User management
│   └── ...
├── database/        # Database layer
│   ├── schema/     # Database schema
│   ├── migrations/ # Migration files
│   └── seeds/      # Seed data
└── main.ts         # Application entry
```

## API Endpoints

- **GET** `/health` - Health check
- **GET** `/metrics` - Prometheus metrics
- **POST** `/api/auth/register` - User registration
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/refresh` - Refresh token
- **GET** `/api/articles` - List articles
- **GET** `/api/articles/:slug` - Get article by slug
- **POST** `/api/articles` - Create article (auth required)
- **PUT** `/api/articles/:id` - Update article (auth required)
- **DELETE** `/api/articles/:id` - Delete article (auth required)
