import { ICreateRoleDTO } from '../../../dtos/ICreateRoleDTO';
import {
  IFindParams,
  IRolesRepository,
} from '../../../repositories/IRolesRepository';
import Role, { IRoleSchema } from '../schemas/Role';

export class RolesRepositoryMongoose implements IRolesRepository {
  async findAll(params: IFindParams): Promise<IRoleSchema[]> {
    return Role.find({
      $or: [
        { title: { $regex: params?.search || '', $options: 'i' } },
        {
          slug: {
            $regex: params?.search || '',
            $options: 'i',
          },
        },
      ],
    }).select('title slug');
  }

  async findById(id: string): Promise<IRoleSchema | null> {
    return Role.findById(id).populate('permissions');
  }

  async findBySlug(slug: string): Promise<IRoleSchema | null> {
    return Role.findOne({ slug }).populate('permissions');
  }

  async countAll(params: IFindParams): Promise<number> {
    return Role.find({
      $or: [
        { title: { $regex: params?.search || '', $options: 'i' } },
        {
          slug: {
            $regex: params?.search || '',
            $options: 'i',
          },
        },
      ],
    }).count();
  }

  async create(roleData: ICreateRoleDTO): Promise<void> {
    await Role.create(roleData);
  }

  async save(role: IRoleSchema): Promise<void> {
    await role.save();
  }
}
