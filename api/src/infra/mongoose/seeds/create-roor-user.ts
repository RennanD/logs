import 'dotenv/config';
import '../database';

import Permission from '../../../modules/users/infra/mongoose/schemas/Permission';
import Role from '../../../modules/users/infra/mongoose/schemas/Role';
import User from '../../../modules/users/infra/mongoose/schemas/User';

import { BcryptHashProvider } from '../../providers/implementations/hash/BcryptHashProvider';

async function createRootUser() {
  const hashProvider = new BcryptHashProvider();

  const permissions = [
    {
      title: 'Cadastrar usuários',
      slug: 'create_users',
    },
    {
      title: 'Editar Usuários',
      slug: 'edit_users',
    },
    {
      title: 'Listar Usuários',
      slug: 'list_users',
    },
    {
      title: 'Cadatrar Perfis',
      slug: 'create_roles',
    },
    {
      title: 'Editar Perfis',
      slug: 'edit_roles',
    },
    {
      title: 'Listar Perfis',
      slug: 'list_roles',
    },
    {
      title: 'Cadastrar Permissões',
      slug: 'create_permissions',
    },
    {
      title: 'Editar Permissões',
      slug: 'edit_permissions',
    },
    {
      title: 'Listar Permissões',
      slug: 'list_permissions',
    },
    {
      title: 'Importar Logs',
      slug: 'import_logs',
    },
    {
      title: 'Listar Logs de Alunos',
      slug: 'list_student_logs',
    },
    {
      title: 'Listar Logs dos Gestores',
      slug: 'list_admins_logs',
    },
  ];

  await Permission.insertMany(permissions);

  const existentPermissions = await Permission.find();

  const permissions_ids = existentPermissions.map(permission => permission._id);

  const role = await Role.create({
    title: 'Root',
    slug: 'root_user',
    permissions: permissions_ids,
  });

  const password = await hashProvider.hash('root@logs', 16);

  await User.create({
    name: 'Usuário Root',
    email: 'root-user@logs.com.br',
    password,
    role: role._id,
  });
}

createRootUser().then();
