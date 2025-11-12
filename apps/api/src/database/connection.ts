import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { config } from '../core/config/env.config';
import { logger } from '../core/logger/logger.service';

export async function createDatabaseConnection() {
  try {
    const poolConnection = mysql.createPool({
      uri: config.database.url,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    const db = drizzle(poolConnection);

    logger.info('Database connection established successfully');

    return { db, pool: poolConnection };
  } catch (error) {
    logger.error('Failed to connect to database', { error });
    throw error;
  }
}

export const db = drizzle(
  mysql.createPool({
    uri: config.database.url,
    waitForConnections: true,
    connectionLimit: 10,
  })
);
