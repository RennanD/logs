import { ICreateUsersDTO } from '../dtos/ICreateUsersDTO';
import { IUserSchema } from '../infra/mongoose/schemas/User';

export interface IFindParams {
  search?: string;
  offset?: number;
  limit?: number;
}

export interface IUsersRepository {
  findAll(params: IFindParams): Promise<IUserSchema[]>;

  findById(id: string): Promise<IUserSchema | null>;

  findByEmail(email: string): Promise<IUserSchema | null>;

  countAll(search: string): Promise<number>;

  create(userData: ICreateUsersDTO): Promise<void>;

  save(user: IUserSchema): Promise<void>;
}
