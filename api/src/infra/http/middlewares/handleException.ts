import { NextFunction, Request, Response } from 'express';
import { ServerError } from '../../errors/ServerError';
import { UnauthozitedError } from '../../errors/UnauthozitedError';

export async function handleException(
  error: ServerError | UnauthozitedError,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): Promise<Response> {
  return response
    .status(error.status_code)
    .json({ error: error.message, type_error: error.type_error });
}
