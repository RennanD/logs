import { inject, injectable } from 'tsyringe';
import { IRoleSchema } from '../../infra/mongoose/schemas/Role';
import { IRolesRepository } from '../../repositories/IRolesRepository';

interface IRequest {
  search?: string;
}

interface IResponse {
  result: IRoleSchema[];
  total_roles: number;
}

@injectable()
export class ListRolesUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async run({ search }: IRequest): Promise<IResponse> {
    const roles = await this.rolesRepository.findAll({ search });

    const total_roles = await this.rolesRepository.countAll({ search });

    return {
      result: roles,
      total_roles,
    };
  }
}
