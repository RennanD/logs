import { inject, injectable } from 'tsyringe';
import { IPermissionSchema } from '../../infra/mongoose/schemas/Permission';
import { IPermissionsRepository } from '../../repositories/IPermissionsRepository';

interface IResponse {
  result: IPermissionSchema[];
  total_permissions: number;
}

@injectable()
export class ListPermissionsUseCase {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  async run(): Promise<IResponse> {
    const permissions = await this.permissionsRepository.findAll();
    const total_permissions = await this.permissionsRepository.countAll();

    return {
      result: permissions,
      total_permissions,
    };
  }
}
