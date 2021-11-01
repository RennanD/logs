import { Request, Response } from 'express';
// import { container } from 'tsyringe';
import { BullProvider } from '../../../../infra/providers/implementations/queue/BullProvider';
import { IImportStudentLogs } from '../../jobs/IImportStudentLogs';

export class ImportStudentLogsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const bullProvider = new BullProvider('import-queue');

    if (file) {
      await bullProvider.addJob<IImportStudentLogs>({ file });
    }

    return response.json({
      message:
        'Sua importação está sendo processada, você será informado assim que finalizar',
    });
  }
}
