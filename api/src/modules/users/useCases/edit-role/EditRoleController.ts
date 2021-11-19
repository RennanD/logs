import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { EditRoleUseCase } from './EditRoleUseCase';

export class EditRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { role_id } = request.params;
    const { title, slug, permissions } = request.body;

    const editRoles = container.resolve(EditRoleUseCase);

    await editRoles.run({ title, slug, permissions, role_id });

    return response.send();
  }
}
