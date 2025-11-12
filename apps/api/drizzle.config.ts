import type { Config } from 'drizzle-kit';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default {
  schema: './src/database/schema/index.ts',
  out: './src/database/migrations',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
