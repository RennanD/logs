import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListStudentsUseCase } from './ListStudentsUseCase';

interface IQueryParmas {
  search?: string;
  limit?: string;
  page?: string;
}

export class ListStudentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search, limit, page } = request.query as IQueryParmas;

    const listStudents = container.resolve(ListStudentsUseCase);

    const result = await listStudents.run({
      search,
      limit,
      page,
    });

    return response.json(result);
  }
}
