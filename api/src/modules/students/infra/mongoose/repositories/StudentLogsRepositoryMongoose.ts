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
  ): Promise<IStudentLogSchema[]> {
    return StudentLog.find({
      student_id_keep: keep_id,
      url: { $regex: params?.url || '', $options: 'i' },
    })
      .skip(Number(params?.offset) || 0)
      .limit(Number(params?.limit || 20));
  }

  async countAll(keep_id: string, url?: string): Promise<number> {
    return StudentLog.find({
      student_id_keep: keep_id,
      url: { $regex: url || '', $options: 'i' },
    }).count();
  }

  async create(createLogData: ICreateStudentLogDTO): Promise<void> {
    await StudentLog.create(createLogData);
  }

  async createMany(createManySLogsData: ICreateStudentLogDTO[]): Promise<void> {
    await StudentLog.insertMany(createManySLogsData);
  }
}
