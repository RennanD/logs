import { Request, Response } from 'express';
// import { container } from 'tsyringe';
import { BullProvider } from '../../../../infra/providers/implementations/queue/BullProvider';
import { ImportStudentLogsUseCase } from './ImportStudentLogsUseCase';

export class ImportStudentLogsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const bullProvider = new BullProvider('import-queue');
    const importStudentLogs = new ImportStudentLogsUseCase(bullProvider);

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
