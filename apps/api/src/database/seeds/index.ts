import { db } from '../connection';
import { users, categories } from '../schema';
import { logger } from '../../core/logger/logger.service';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    logger.info('Starting database seeding...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await db.insert(users).values([
      {
        email: 'admin@financeblog.com',
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
      },
      {
        email: 'editor@financeblog.com',
        username: 'editor',
        password: hashedPassword,
        role: 'editor',
      },
      {
        email: 'user@financeblog.com',
        username: 'user',
        password: hashedPassword,
        role: 'user',
      },
    ]);

    logger.info('Users seeded successfully');

    // Create categories
    await db.insert(categories).values([
      {
        name: 'Investments',
        slug: 'investments',
        description: 'Investment strategies and market analysis',
      },
      {
        name: 'Personal Finance',
        slug: 'personal-finance',
        description: 'Tips for managing your personal finances',
      },
      {
        name: 'Cryptocurrency',
        slug: 'cryptocurrency',
        description: 'News and insights about cryptocurrencies',
      },
      {
        name: 'Stock Market',
        slug: 'stock-market',
        description: 'Stock market trends and analysis',
      },
      {
        name: 'Real Estate',
        slug: 'real-estate',
        description: 'Real estate investment opportunities',
      },
    ]);

    logger.info('Categories seeded successfully');
    logger.info('Database seeding completed!');

    process.exit(0);
  } catch (error) {
    logger.error('Seeding failed', { error });
    process.exit(1);
  }
}

seed();
