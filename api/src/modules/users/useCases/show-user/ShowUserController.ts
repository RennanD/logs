import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowUserUseCase } from './ShowUserUseCase';

export class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showUser = container.resolve(ShowUserUseCase);

    const user = await showUser.run({ user_id });

    return response.json({ result: user });
  }
}
