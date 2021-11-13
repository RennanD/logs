import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUsersUseCase } from './ListUsersUseCase';

interface IQueryParams {
  search?: string;
  limit?: string;
  page?: string;
}

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search, limit, page } = request.query as IQueryParams;

    const listUsers = container.resolve(ListUsersUseCase);

    const users = await listUsers.run({ search, limit, page });

    return response.json(users);
  }
}
