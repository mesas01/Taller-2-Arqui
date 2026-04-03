import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/appError';
import { fail } from '../utils/apiResponse';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json(fail('Validation failed', err.flatten()));
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(fail(err.message, err.details));
  }

  return res.status(500).json(fail('Internal server error'));
}
