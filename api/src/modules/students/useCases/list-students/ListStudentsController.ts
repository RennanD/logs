import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListStudentsUseCase } from './ListStudentsUseCase';

interface IQueryParmas {
  name?: string;
  student_id_keep?: string;
  limit?: number;
  offset?: number;
}

export class ListStudentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, student_id_keep, limit, offset } =
      request.query as IQueryParmas;

    const listStudents = container.resolve(ListStudentsUseCase);

    const result = await listStudents.run({
      name,
      student_id_keep,
      limit,
      offset,
    });

    return response.json(result);
  }
}
