import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(200, 'Title must be at most 200 characters'),

  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers and hyphens'),

  content: z
    .string()
    .min(100, 'Content must be at least 100 characters'),

  excerpt: z
    .string()
    .max(300, 'Excerpt must be at most 300 characters')
    .optional(),

  categoryId: z
    .number()
    .int()
    .positive(),

  featuredImage: z
    .string()
    .url('Invalid image URL')
    .optional(),

  status: z.enum(['draft', 'published']),
});

export const updateArticleSchema = createArticleSchema.partial();

export type CreateArticleDto = z.infer<typeof createArticleSchema>;
export type UpdateArticleDto = z.infer<typeof updateArticleSchema>;
