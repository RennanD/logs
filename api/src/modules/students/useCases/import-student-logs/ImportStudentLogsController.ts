import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportStudentLogsUseCase } from './ImportStudentLogsUseCase';

export class ImportStudentLogsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importStudentLogs = container.resolve(ImportStudentLogsUseCase);

    if (file) {
      importStudentLogs.run(file);
    }

    return response.json({
      message:
        'Sua importação está sendo processada, você será informado assim que finalizar',
    });
  }
}
