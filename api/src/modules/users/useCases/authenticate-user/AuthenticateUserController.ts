import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserUseCase);

    const result = await authenticateUser.run({ email, password });

    return response.json(result);
  }
}
