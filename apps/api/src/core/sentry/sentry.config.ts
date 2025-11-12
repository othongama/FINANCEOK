import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { config } from '../config/env.config';
import { Request, Response, NextFunction } from 'express';

export function initSentry() {
  if (!config.sentry.dsn) {
    return;
  }

  Sentry.init({
    dsn: config.sentry.dsn,
    environment: config.env,
    integrations: [new ProfilingIntegration()],
    tracesSampleRate: config.isProduction ? 0.1 : 1.0,
    profilesSampleRate: config.isProduction ? 0.1 : 1.0,
  });
}

export function sentryErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  Sentry.captureException(err, {
    user: {
      id: (req as any).user?.id,
      email: (req as any).user?.email,
    },
    extra: {
      url: req.url,
      method: req.method,
      body: req.body,
      query: req.query,
    },
  });

  next(err);
}
