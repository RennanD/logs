export class ForbiddenError {
  public readonly message: string;

  public readonly status_code: number;

  public readonly type_error: string;

  constructor(message: string) {
    this.message = message;
    this.status_code = 403;
    this.type_error = 'forbbiend_error';
  }
}
