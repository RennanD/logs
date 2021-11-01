import 'reflect-metadata';
import '../container';

import { container } from 'tsyringe';
import { BullProvider } from '../providers/implementations/queue/BullProvider';

import { IImportStudentLogs } from '../../modules/students/jobs/IImportStudentLogs';
import { ImportStudentLogsJob } from '../../modules/students/jobs/ImportStudentLogsJob';

const importQueueProvider = new BullProvider('import-queue');

importQueueProvider.process<IImportStudentLogs>(async job => {
  const importStudentLogs = container.resolve(ImportStudentLogsJob);

  importStudentLogs.handle(job.file);
});
