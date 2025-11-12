import { migrate } from 'drizzle-orm/mysql2/migrator';
import { createDatabaseConnection } from './connection';
import { logger } from '../core/logger/logger.service';
import path from 'path';

async function runMigrations() {
  try {
    logger.info('Starting database migrations...');

    const { db, pool } = await createDatabaseConnection();

    await migrate(db, {
      migrationsFolder: path.join(__dirname, './migrations'),
    });

    logger.info('Database migrations completed successfully');

    await pool.end();
    process.exit(0);
  } catch (error) {
    logger.error('Migration failed', { error });
    process.exit(1);
  }
}

runMigrations();
