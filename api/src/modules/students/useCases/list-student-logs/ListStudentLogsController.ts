import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListStudentLogsUseCase } from './ListStudentLogsUseCase';

// interface IQueryParams {
//   url?: string;
//   limit?: number;
//   offset?: number;
// }

export class ListStudentLogsController {
  async handle(request: Request, response: Response): Promise<Response> {
    // const { url, limit, offset } = request.query as IQueryParams;
    const { student_id } = request.params;

    const listStudentLogs = container.resolve(ListStudentLogsUseCase);

    try {
      const result = await listStudentLogs.run(student_id);

      return response.json(result);
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      });
    }
  }
}
