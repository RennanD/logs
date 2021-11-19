import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowRoleUseCase } from './ShowRoleUseCase';

export class ShowRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { role_id } = request.params;

    const showRole = container.resolve(ShowRoleUseCase);

    const role = await showRole.run({ role_id });

    return response.json({ result: role });
  }
}
