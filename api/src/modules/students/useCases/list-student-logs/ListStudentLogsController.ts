import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListStudentLogsUseCase } from './ListStudentLogsUseCase';

// interface IQueryParams {
//   url?: string;
//   limit?: number;
//   offset?: number;
// }

interface IQueryParams {
  page?: string;
  limit?: string;
  url?: string;
}

export class ListStudentLogsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { limit, page, url } = request.query as IQueryParams;
    const { student_id } = request.params;

    const listStudentLogs = container.resolve(ListStudentLogsUseCase);

    try {
      const result = await listStudentLogs.run(student_id, {
        limit,
        page,
        url,
      });

      return response.json(result);
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      });
    }
  }
}
