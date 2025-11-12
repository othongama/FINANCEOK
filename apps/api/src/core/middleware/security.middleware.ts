import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import { RequestHandler } from 'express';

export const securityMiddleware: RequestHandler[] = [
  // Prevent HTTP Parameter Pollution
  hpp(),

  // Sanitize data to prevent NoSQL injection
  mongoSanitize(),
];
