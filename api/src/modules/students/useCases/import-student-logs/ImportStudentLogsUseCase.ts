import { IQueueProvider } from '../../../../infra/providers/IImportQueueProvider';
import { IImportStudentLogs } from '../../jobs/IImportStudentLogs';

export class ImportStudentLogsUseCase {
  constructor(private importQueue: IQueueProvider) {}

  async run(file: Express.Multer.File): Promise<void> {
    await this.importQueue.addJob<IImportStudentLogs>({ file });
  }
}
