import { IPermissionSchema } from '../infra/mongoose/schemas/Permission';

export interface IPermissionsRepository {
  findAll(): Promise<IPermissionSchema[]>;
  findById(id: string): Promise<IPermissionSchema | null>;
  findBySlug(slug: string): Promise<IPermissionSchema | null>;
  countAll(): Promise<number>;
}
