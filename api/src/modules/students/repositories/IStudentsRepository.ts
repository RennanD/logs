import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import { IStudentsSchema } from '../infra/mongoose/schemas/Student';

export interface IFindStudentParams {
  student_id_keep?: string;
  name?: string;
  limit?: number;
  offset?: number;
}

export interface IStudentsRepository {
  findAll(params?: IFindStudentParams): Promise<IStudentsSchema[]>;
  countAll(params?: IFindStudentParams): Promise<number>;
  findById(id: string): Promise<IStudentsSchema | null>;
  findByKeepId(keep_id: string): Promise<IStudentsSchema | null>;
  create(createStudentData: ICreateStudentDTO): Promise<void>;
  createMany(createManyStudentData: ICreateStudentDTO[]): Promise<void>;
  save(student: IStudentsSchema): Promise<void>;
}
