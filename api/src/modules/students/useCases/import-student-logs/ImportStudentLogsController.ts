import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportStudentLogsUseCase } from './ImportStudentLogsUseCase';

export class ImportStudentLogsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importStudentLogs = container.resolve(ImportStudentLogsUseCase);

    try {
      if (file) {
        await importStudentLogs.run(file);
      }

      return response.status(201).send();
    } catch (error) {
      return response.json({
        error: error.message,
      });
    }
  }
}
