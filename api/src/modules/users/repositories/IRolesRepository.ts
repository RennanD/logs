import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import { IRoleSchema } from '../infra/mongoose/schemas/Role';

export interface IFindParams {
  search?: string;
}

export interface IRolesRepository {
  findAll(params: IFindParams): Promise<IRoleSchema[]>;
  findById(id: string): Promise<IRoleSchema | null>;
  findBySlug(slug: string): Promise<IRoleSchema | null>;
  countAll(params: IFindParams): Promise<number>;
  create(roleData: ICreateRoleDTO): Promise<void>;
  save(role: IRoleSchema): Promise<void>;
}
