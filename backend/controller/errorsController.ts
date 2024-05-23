import { Request, Response, NextFunction } from 'express';
import { AppError } from '../util/appError';

export const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'fail';

  res.status(statusCode).json({
    status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

