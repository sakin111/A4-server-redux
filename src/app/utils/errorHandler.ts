import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: err,
    });
  } else {
    res.status(500).json({
      message: err.message || 'Internal Server Error',
      success: false,
      error: err,
    });
  }
}
