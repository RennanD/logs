import { container } from 'tsyringe';
import { StudentLogsRepositoryMongoose } from '../../modules/students/infra/mongoose/repositories/StudentLogsRepositoryMongoose';
import { StudentsRespositoryMongoose } from '../../modules/students/infra/mongoose/repositories/StudentsRespositoryMongoose';
import { IStudentLogsRepository } from '../../modules/students/repositories/IStudentLogsRepository';
import { IStudentsRepository } from '../../modules/students/repositories/IStudentsRepository';

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRespositoryMongoose,
);

container.registerSingleton<IStudentLogsRepository>(
  'StudentLogsRepository',
  StudentLogsRepositoryMongoose,
);
