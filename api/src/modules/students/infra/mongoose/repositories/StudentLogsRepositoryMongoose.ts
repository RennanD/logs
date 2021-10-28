import { ICreateStudentLogDTO } from '../../../dtos/ICreateStudentLogDTO';
import {
  IStudentLogsRepository,
  IFindParams,
} from '../../../repositories/IStudentLogsRepository';
import StudentLog, { IStudentLogSchema } from '../schemas/StudentLog';

export class StudentLogsRepositoryMongoose implements IStudentLogsRepository {
  async findAllByKeepId(
    keep_id: string,
    params?: IFindParams,
  ): Promise<IStudentLogSchema | null> {
    throw new Error('Method not implemented.');
  }

  async create(createLogData: ICreateStudentLogDTO): Promise<void> {
    await StudentLog.create(createLogData);
  }

  async createMany(createManySLogsData: ICreateStudentLogDTO[]): Promise<void> {
    await StudentLog.insertMany(createManySLogsData);
  }
}
