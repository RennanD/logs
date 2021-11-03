import { ICreateStudentLogDTO } from '../../../dtos/ICreateStudentLogDTO';
import {
  IStudentLogsRepository,
  IFindParams,
} from '../../../repositories/IStudentLogsRepository';
import StudentLog, { IStudentLogSchema } from '../schemas/StudentLog';

export class StudentLogsRepositoryMongoose implements IStudentLogsRepository {
  async findById(id: string): Promise<IStudentLogSchema | null> {
    return StudentLog.findById(id);
  }

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

  async create(
    createLogData: ICreateStudentLogDTO,
  ): Promise<IStudentLogSchema> {
    const log = await StudentLog.create(createLogData);

    return log;
  }

  async createMany(createManySLogsData: ICreateStudentLogDTO[]): Promise<void> {
    await StudentLog.insertMany(createManySLogsData);
  }
}
