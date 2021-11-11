import { AppError } from './AppError';

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 403, 'bab_request_error');
  }
}
