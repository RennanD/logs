import 'reflect-metadata';
import '../container';
import '../mongoose/database';

import { container } from 'tsyringe';
import { BullProvider } from '../providers/implementations/queue/BullProvider';

import { IAddLogsToStudentsJob } from '../../modules/students/jobs/IAddLogsToStudentsJob';
import { AddLogsToStudentUseCase } from '../../modules/students/useCases/add-logs-to-student/AddLogsToStudentUseCase';
import { IImportStudentLogs } from '../../modules/students/jobs/IImportStudentLogs';
import { ImportStudentLogsUseCase } from '../../modules/students/useCases/import-student-logs/ImportStudentLogsUseCase';
import { BullMQProvider } from '../providers/implementations/queue/BullMQProvider';

const importQueueProvider = new BullProvider('import-student-logs-queue');
const addLogToQueueProvider = new BullMQProvider('add-student-logs-queue');

importQueueProvider.process<IImportStudentLogs>(async job => {
  const { file } = job;

  const importStudentLogs = container.resolve(ImportStudentLogsUseCase);

  await importStudentLogs.run(file);
});

addLogToQueueProvider.process<IAddLogsToStudentsJob>(async job => {
  const { logs, student_id_keep } = job;

  const addLogsToStudent = container.resolve(AddLogsToStudentUseCase);

  await addLogsToStudent.run({ student_id_keep, logs });
}, 10);
