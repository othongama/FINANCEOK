# Finance Blog - Frontend

Next.js 14 frontend application for Finance Blog.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **TanStack Query** - Data fetching
- **Zustand** - State management

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

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

## Project Structure

```
src/
├── app/              # App Router pages
├── components/       # React components
│   ├── ui/          # Base UI components
│   ├── features/    # Feature components
│   └── layouts/     # Layout components
├── hooks/           # Custom hooks
├── lib/             # Utilities and configs
├── styles/          # Global styles
└── utils/           # Helper functions
```
