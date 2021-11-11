import { inject, injectable } from 'tsyringe';
import { IRolesRepository } from '../../repositories/IRolesRepository';

import { BadRequestError } from '../../../../infra/errors/BadRequestError';
import { IPermissionsRepository } from '../../repositories/IPermissionsRepository';

interface IRequest {
  title: string;
  slug: string;
  permissions: [];
}

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  async run({ title, slug, permissions }: IRequest): Promise<void> {
    const existentRole = await this.rolesRepository.findBySlug(slug);

    if (existentRole) {
      throw new BadRequestError('Este perfil já existe');
    }

    const existentPermissions = await this.permissionsRepository.findAll();

    const permissionsIds = existentPermissions.map(permission =>
      permission._id.toString(),
    );

    await this.rolesRepository.create({
      title,
      slug,
      permissions: permissions.filter(permission =>
        permissionsIds.includes(permission),
      ),
    });
  }
}
