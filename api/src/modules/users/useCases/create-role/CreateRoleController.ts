import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRoleUseCase } from './CreateRoleUseCase';

export class CreateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, slug, permissions } = request.body;

    const createRoles = container.resolve(CreateRoleUseCase);

    await createRoles.run({ title, slug, permissions });

    return response.status(201).send();
  }
}
