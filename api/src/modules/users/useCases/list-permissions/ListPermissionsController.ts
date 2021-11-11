import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListPermissionsUseCase } from './ListPermissionsUseCase';

export class ListPermissionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPermissions = container.resolve(ListPermissionsUseCase);

    const permissions = await listPermissions.run();

    return response.json(permissions);
  }
}
