import { ICreateStudentLogDTO } from '../dtos/ICreateStudentLogDTO';
// import { IStudentLogSchema } from '../infra/mongoose/schemas/StudentLog';

export interface IStudentLogsRepository {
  // findAllByKeepId(keep_id: string): Promise<IStudentLogSchema | null>;
  create(createLogData: ICreateStudentLogDTO): Promise<void>;
  createMany(createManySLogsData: ICreateStudentLogDTO[]): Promise<void>;
}
