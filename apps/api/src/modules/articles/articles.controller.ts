import { Router } from 'express';

export const articlesRouter = Router();

// Placeholder routes
articlesRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'List articles endpoint - To be implemented',
    data: [],
  });
});

articlesRouter.get('/:slug', (req, res) => {
  res.status(501).json({
    message: 'Get article by slug - To be implemented',
    slug: req.params.slug,
  });
});

articlesRouter.post('/', (req, res) => {
  res.status(501).json({ message: 'Create article endpoint - To be implemented' });
});

articlesRouter.put('/:id', (req, res) => {
  res.status(501).json({
    message: 'Update article endpoint - To be implemented',
    id: req.params.id,
  });
});

articlesRouter.delete('/:id', (req, res) => {
  res.status(501).json({
    message: 'Delete article endpoint - To be implemented',
    id: req.params.id,
  });
});
