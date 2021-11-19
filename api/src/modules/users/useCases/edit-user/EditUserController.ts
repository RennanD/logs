import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { EditUserUseCase } from './EditUserUseCase';

export class EditUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { name, role } = request.body;

    const editUsers = container.resolve(EditUserUseCase);

    await editUsers.run({ name, role, user_id });

    return response.send();
  }
}
