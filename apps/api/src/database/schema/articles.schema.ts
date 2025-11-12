import { mysqlTable, serial, varchar, text, int, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';
import { users } from './users.schema';
import { categories } from './categories.schema';

export const articles = mysqlTable('articles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featuredImage: varchar('featured_image', { length: 500 }),
  authorId: int('author_id').notNull().references(() => users.id),
  categoryId: int('category_id').notNull().references(() => categories.id),
  status: mysqlEnum('status', ['draft', 'published']).notNull().default('draft'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});
