import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './core/config/env.config';
import { logger } from './core/logger/logger.service';
import { initSentry, sentryErrorHandler } from './core/sentry/sentry.config';
import { securityMiddleware } from './core/middleware/security.middleware';
import { apiLimiter } from './core/middleware/rate-limit.middleware';
import { metricsMiddleware, register } from './core/metrics/metrics.service';
import { errorHandler } from './core/middleware/error.middleware';
import { authRouter } from './modules/auth/auth.controller';
import { articlesRouter } from './modules/articles/articles.controller';

// Initialize Sentry
if (config.sentry.dsn) {
  initSentry();
}

const app = express();

// Security middleware
app.use(helmet());
app.use(securityMiddleware);

// CORS
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Metrics
app.use(metricsMiddleware);

// Rate limiting
app.use('/api/', apiLimiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
  });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/articles', articlesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// Error handlers
app.use(sentryErrorHandler);
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT} in ${config.env} mode`);
  logger.info(`📊 Metrics available at http://localhost:${PORT}/metrics`);
  logger.info(`💚 Health check at http://localhost:${PORT}/health`);
});

export { app };
