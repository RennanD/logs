import { Request, Response } from 'express';

import { BullMQProvider } from '../../../../infra/providers/implementations/queue/BullMQProvider';
import { IImportStudentLogs } from '../../jobs/IImportStudentLogs';

export class ImportStudentLogsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importStudentLogQueue = new BullMQProvider(
      'import-student-logs-queue',
    );

    if (file) {
      importStudentLogQueue.addJob<IImportStudentLogs>(
        { file },
        'import-student-log-file',
      );
    }

    return response.json({
      message:
        'Sua importação está sendo processada, você será informado assim que finalizar',
    });
  }
}
