import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppError';

export async function handleException(
  error: AppError | Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): Promise<Response> {
  if (error instanceof AppError) {
    return response
      .status(error.status_code)
      .json({ error: error.message, type_error: error.type_error });
  }
  return response.status(500).json({
    error: `Internal server error - ${error.message}`,
    type_error: 'server_erro',
  });
}
