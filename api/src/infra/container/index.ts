import { container } from 'tsyringe';
import { StudentLogsRepositoryMongoose } from '../../modules/students/infra/mongoose/repositories/StudentLogsRepositoryMongoose';
import { StudentsRepositoryMongoose } from '../../modules/students/infra/mongoose/repositories/StudentsRepositoryMongoose';
import { IStudentLogsRepository } from '../../modules/students/repositories/IStudentLogsRepository';
import { IStudentsRepository } from '../../modules/students/repositories/IStudentsRepository';
import { IQueueProvider } from '../providers/IQueueProvider';
import { BullMQProvider } from '../providers/implementations/queue/BullMQProvider';
import { IHashProvider } from '../providers/IHashProvider';
import { BcryptHashProvider } from '../providers/implementations/hash/BcryptHashProvider';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { UsersRepositoryMongoose } from '../../modules/users/infra/mongoose/repositories/UsersRepositoryMongoose';
import { IRolesRepository } from '../../modules/users/repositories/IRolesRepository';
import { RolesRepositoryMongoose } from '../../modules/users/infra/mongoose/repositories/RolesRepositoryMongoose';

// Repositories

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRepositoryMongoose,
);

container.registerSingleton<IStudentLogsRepository>(
  'StudentLogsRepository',
  StudentLogsRepositoryMongoose,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepositoryMongoose,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepositoryMongoose,
);

// Providers

container.registerInstance<IQueueProvider>(
  'ImportStudentLogQueueProvider',
  new BullMQProvider('import-student-logs-queue'),
);

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
