import 'reflect-metadata';
import '../container';
import '../mongoose/database';

import { container } from 'tsyringe';
import { BullProvider } from '../providers/implementations/queue/BullProvider';

import { IImportStudentLogs } from '../../modules/students/jobs/IImportStudentLogs';
import { ImportStudentLogsUseCase } from '../../modules/students/useCases/import-student-logs/ImportStudentLogsUseCase';

const importQueueProvider = new BullProvider('import-queue');

importQueueProvider.process<IImportStudentLogs>(async job => {
  const importStudentLogs = container.resolve(ImportStudentLogsUseCase);

  await importStudentLogs.run(job.file);
});
