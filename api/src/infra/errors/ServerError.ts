export class ServerError {
  public readonly message: string;

  public readonly status_code: number;

  public readonly type_error: string;

  constructor(message: string) {
    this.message = `Internal server error - ${message}`;
    this.status_code = 500;
    this.type_error = 'server_error';
  }
}
