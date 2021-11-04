import { Request, Response } from 'express';
import { container, inject, injectable } from 'tsyringe';
import { IQueueProvider } from '../../../../infra/providers/IImportQueueProvider';
import { BullProvider } from '../../../../infra/providers/implementations/queue/BullProvider';
import { IImportStudentLogs } from '../../jobs/IImportStudentLogs';

import { ImportStudentLogsUseCase } from './ImportStudentLogsUseCase';

// @injectable()
export class ImportStudentLogsController {
  // constructor(
  //   @inject('ImportStudentLogQueueProvider')
  //   private importStudentLogQueue: IQueueProvider,
  // ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importStudentLogQueue = new BullProvider('import-student-logs-queue');

    const importStudentLogs = container.resolve(ImportStudentLogsUseCase);

    if (file) {
      // importStudentLogQueue.addJob<IImportStudentLogs>({ file });
      await importStudentLogs.run(file);
    }

    return response.json({
      message:
        'Sua importação está sendo processada, você será informado assim que finalizar',
    });
  }
}
