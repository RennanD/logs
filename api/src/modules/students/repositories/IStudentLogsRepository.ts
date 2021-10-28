import { ICreateStudentLogDTO } from '../dtos/ICreateStudentLogDTO';
import { IStudentLogSchema } from '../infra/mongoose/schemas/StudentLog';

export interface IFindParams {
  url?: string;
  limit?: number;
  offset?: number;
}

export interface IStudentLogsRepository {
  findAllByKeepId(
    keep_id: string,
    params?: IFindParams,
  ): Promise<IStudentLogSchema[]>;

  countAll(keep_id: string, url?: string): Promise<number>;

  create(createLogData: ICreateStudentLogDTO): Promise<void>;
  createMany(createManySLogsData: ICreateStudentLogDTO[]): Promise<void>;
}
