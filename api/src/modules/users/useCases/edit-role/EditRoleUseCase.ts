import { inject, injectable } from 'tsyringe';
import { NotFoundError } from '../../../../infra/errors/NotFoundError';
import { IRolesRepository } from '../../repositories/IRolesRepository';

interface IRequest {
  role_id: string;
  title: string;
  slug: string;
  permissions: string[];
}

@injectable()
export class EditRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async run({ title, slug, role_id, permissions }: IRequest): Promise<void> {
    const role = await this.rolesRepository.findById(role_id);

    if (!role) {
      throw new NotFoundError('Perfil não encontrado');
    }

    Object.assign(role, { title, slug, permissions });

    await this.rolesRepository.save(role);
  }
}
