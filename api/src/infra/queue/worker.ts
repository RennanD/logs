import 'reflect-metadata';
import '../container';
import '../mongoose/database';

import { container } from 'tsyringe';
import { BullProvider } from '../providers/implementations/queue/BullProvider';

import { IAddLogsToStudentsJob } from '../../modules/students/jobs/IAddLogsToStudentsJob';
import { AddLogsToStudentUseCase } from '../../modules/students/useCases/add-logs-to-student/AddLogsToStudentUseCase';

const importQueueProvider = new BullProvider('import-student-logs-queue');

importQueueProvider.process<IAddLogsToStudentsJob>(async job => {
  const { student_id_keep, logs } = job;

  const addLogsToStudent = container.resolve(AddLogsToStudentUseCase);

  await addLogsToStudent.run({ student_id_keep, logs });
});
