import { container } from 'tsyringe';
import { StudentLogsRepositoryMongoose } from '../../modules/students/infra/mongoose/repositories/StudentLogsRepositoryMongoose';
import { StudentsRepositoryMongoose } from '../../modules/students/infra/mongoose/repositories/StudentsRepositoryMongoose';
import { IStudentLogsRepository } from '../../modules/students/repositories/IStudentLogsRepository';
import { IStudentsRepository } from '../../modules/students/repositories/IStudentsRepository';
import { IQueueProvider } from '../providers/IImportQueueProvider';
import { BullProvider } from '../providers/implementations/queue/BullProvider';
import { BullMQProvider } from '../providers/implementations/queue/BullMQProvider';

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRepositoryMongoose,
);

container.registerSingleton<IStudentLogsRepository>(
  'StudentLogsRepository',
  StudentLogsRepositoryMongoose,
);

container.registerInstance<IQueueProvider>(
  'ImportStudentLogQueueProvider',
  new BullProvider('import-student-logs-queue'),
);

container.registerInstance<IQueueProvider>(
  'AddLogToQueueProvider',
  new BullMQProvider('add-student-logs-queue'),
);
