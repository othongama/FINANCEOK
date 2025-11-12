import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger.service';
import { config } from '../config/env.config';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors,
    });
  }

  // Default error
  const statusCode = (err as any).statusCode || 500;
  const message = config.isProduction
    ? 'Internal Server Error'
    : err.message;

  res.status(statusCode).json({
    error: message,
    ...(config.isDevelopment && { stack: err.stack }),
  });
}
