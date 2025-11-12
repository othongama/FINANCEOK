import { Router } from 'express';
import { authLimiter } from '../../core/middleware/rate-limit.middleware';

export const authRouter = Router();

// Placeholder routes
authRouter.post('/register', authLimiter, (req, res) => {
  res.status(501).json({ message: 'Registration endpoint - To be implemented' });
});

authRouter.post('/login', authLimiter, (req, res) => {
  res.status(501).json({ message: 'Login endpoint - To be implemented' });
});

authRouter.post('/refresh', (req, res) => {
  res.status(501).json({ message: 'Refresh token endpoint - To be implemented' });
});

authRouter.post('/logout', (req, res) => {
  res.status(501).json({ message: 'Logout endpoint - To be implemented' });
});
