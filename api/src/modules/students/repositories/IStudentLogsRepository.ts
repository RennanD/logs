import { ICreateStudentLogDTO } from '../dtos/ICreateStudentLogDTO';
import { IStudentLogSchema } from '../infra/mongoose/schemas/StudentLog';

export interface IFindParams {
  limit?: number;
  offset?: number;
}

export interface IStudentLogsRepository {
  findAllByKeepId(
    keep_id: string,
    params?: IFindParams,
  ): Promise<IStudentLogSchema | null>;
  create(createLogData: ICreateStudentLogDTO): Promise<void>;
  createMany(createManySLogsData: ICreateStudentLogDTO[]): Promise<void>;
}
