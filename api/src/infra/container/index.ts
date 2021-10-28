import { container } from 'tsyringe';
import { StudentLogsRepositoryMongoose } from '../../modules/students/infra/mongoose/repositories/StudentLogsRepositoryMongoose';
import { StudentsRepositoryMongoose } from '../../modules/students/infra/mongoose/repositories/StudentsRepositoryMongoose';
import { IStudentLogsRepository } from '../../modules/students/repositories/IStudentLogsRepository';
import { IStudentsRepository } from '../../modules/students/repositories/IStudentsRepository';

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRepositoryMongoose,
);

container.registerSingleton<IStudentLogsRepository>(
  'StudentLogsRepository',
  StudentLogsRepositoryMongoose,
);
