type TypeError = 'auth_error' | 'expired_error';

export class UnauthozitedError {
  public readonly message: string;

  public readonly status_code: number;

  public readonly type_error: TypeError;

  constructor(message: string, type_error: TypeError = 'auth_error') {
    this.message = message;
    this.status_code = 401;
    this.type_error = type_error;
  }
}
