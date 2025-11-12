import type { Config } from 'drizzle-kit';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default {
  schema: './src/database/schema/*',
  out: './src/database/migrations',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
