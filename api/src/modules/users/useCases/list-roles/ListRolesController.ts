import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListRolesUseCase } from './ListRolesUseCase';

export class ListRolesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const search = request.query.search as string;

    const listRoles = container.resolve(ListRolesUseCase);

    const roles = await listRoles.run({ search });

    return response.json(roles);
  }
}
