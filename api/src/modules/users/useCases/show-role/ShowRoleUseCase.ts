import { inject, injectable } from 'tsyringe';
import { NotFoundError } from '../../../../infra/errors/NotFoundError';
import { IRoleSchema } from '../../infra/mongoose/schemas/Role';
import { IRolesRepository } from '../../repositories/IRolesRepository';

interface IRequest {
  role_id: string;
}

@injectable()
export class ShowRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async run({ role_id }: IRequest): Promise<IRoleSchema> {
    const role = await this.rolesRepository.findById(role_id);

    if (!role) {
      throw new NotFoundError('Perfil não encontrado');
    }

    return role;
  }
}
