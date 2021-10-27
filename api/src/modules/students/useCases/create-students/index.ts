import { StudentsRespositoryMongoose } from '../../infra/mongoose/repositories/StudentsRespositoryMongoose';
import { CreateStudentsUseCase } from './CreateStudentsUseCase';

const studentsRespositoryMongoose = new StudentsRespositoryMongoose();

const createStudents = new CreateStudentsUseCase(studentsRespositoryMongoose);

export { createStudents };
