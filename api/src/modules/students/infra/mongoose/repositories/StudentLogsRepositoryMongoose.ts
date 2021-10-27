import { ICreateStudentLogDTO } from '../../../dtos/ICreateStudentLogDTO';
import { IStudentLogsRepository } from '../../../repositories/IStudentLogsRepository';
import StudentLog from '../schemas/StudentLog';

export class StudentLogsRepositoryMongoose implements IStudentLogsRepository {
  async create(createLogData: ICreateStudentLogDTO): Promise<void> {
    await StudentLog.create(createLogData);
  }

  async createMany(createManySLogsData: ICreateStudentLogDTO[]): Promise<void> {
    await StudentLog.insertMany(createManySLogsData);
  }
}
