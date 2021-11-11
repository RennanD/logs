import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role, avatar } = request.body;

    const createUsers = container.resolve(CreateUserUseCase);

    await createUsers.run({ email, name, password, role, avatar });

    return response.status(201).send();
  }
}
