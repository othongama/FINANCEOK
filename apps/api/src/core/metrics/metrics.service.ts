import client from 'prom-client';
import { Request, Response, NextFunction } from 'express';

// Create a Registry
export const register = new client.Registry();

// Add default metrics
client.collectDefaultMetrics({ register });

// Custom metrics
export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

export const httpRequestTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

export const databaseQueryDuration = new client.Histogram({
  name: 'database_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['operation', 'table'],
  registers: [register],
});

// Middleware to collect metrics
export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;

    httpRequestDuration
      .labels(
        req.method,
        (req as any).route?.path || req.path,
        res.statusCode.toString()
      )
      .observe(duration);

    httpRequestTotal
      .labels(
        req.method,
        (req as any).route?.path || req.path,
        res.statusCode.toString()
      )
      .inc();
  });

  next();
}

// Get metrics
export async function getMetrics() {
  return register.metrics();
}
