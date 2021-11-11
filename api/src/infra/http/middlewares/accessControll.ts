import { NextFunction, Request, Response } from 'express';
import { RolesRepositoryMongoose } from '../../../modules/users/infra/mongoose/repositories/RolesRepositoryMongoose';
import { UsersRepositoryMongoose } from '../../../modules/users/infra/mongoose/repositories/UsersRepositoryMongoose';
import { ForbiddenError } from '../../errors/ForbiddenError';

type IPermissions =
  | 'create_users'
  | 'edit_users'
  | 'create_roles'
  | 'edit_roles'
  | 'import_logs'
  | 'list_student_logs'
  | 'list_permissions'
  | 'list_users'
  | 'list_admins_logs';

export function accessControll(permission: IPermissions) {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const usersRepository = new UsersRepositoryMongoose();
    const rolesRepository = new RolesRepositoryMongoose();

    const user = await usersRepository.findById(request.user.user_id);

    if (!user) {
      throw new ForbiddenError(
        'Você não possui permissões para acessar o sistema',
      );
    }

    const role = await rolesRepository.findById(user.role._id);

    if (!role) {
      throw new ForbiddenError('Seu perfile de usuário não possui permissões');
    }

    const rolePermissions = role.permissions.map(
      permissionItem => permissionItem.slug,
    );

    if (!rolePermissions.includes(permission)) {
      throw new ForbiddenError('Você não possui permissões suficientes');
    }

    return next();
  };
}
