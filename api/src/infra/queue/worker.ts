import 'reflect-metadata';
import '../container';
import '../mongoose/database';

import { container } from 'tsyringe';

import { IImportStudentLogs } from '../../modules/students/jobs/IImportStudentLogs';
import { ImportStudentLogsUseCase } from '../../modules/students/useCases/import-student-logs/ImportStudentLogsUseCase';
import { BullMQProvider } from '../providers/implementations/queue/BullMQProvider';

const importQueueProvider = new BullMQProvider('import-student-logs-queue');

importQueueProvider.process<IImportStudentLogs>(async job => {
  const { file } = job;

  const importStudentLogs = container.resolve(ImportStudentLogsUseCase);

  await importStudentLogs.run(file);
});
