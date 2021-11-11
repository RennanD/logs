import { AppError } from './AppError';

export class ServerError extends AppError {
  constructor(message: string) {
    super(`Internal server error - ${message}`, 500, 'server_error');
  }
}
