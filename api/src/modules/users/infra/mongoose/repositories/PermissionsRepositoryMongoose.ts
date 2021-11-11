import { IPermissionsRepository } from '../../../repositories/IPermissionsRepository';
import Permission, { IPermissionSchema } from '../schemas/Permission';

export class PermissionsRepositoryMongoose implements IPermissionsRepository {
  async findAll(): Promise<IPermissionSchema[]> {
    return Permission.find();
  }

  async findById(id: string): Promise<IPermissionSchema | null> {
    return Permission.findById(id);
  }

  async findBySlug(slug: string): Promise<IPermissionSchema | null> {
    return Permission.findOne({ slug });
  }

  async countAll(): Promise<number> {
    return Permission.find().count();
  }
}
