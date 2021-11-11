import { Router } from 'express';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateRoleController } from '../../../modules/users/useCases/create-role/CreateRoleController';
import { ListRolesController } from '../../../modules/users/useCases/list-roles/ListRolesController';

const rolesRouter = Router();

const createRoleController = new CreateRoleController();
const listRolesController = new ListRolesController();

rolesRouter.use(ensureAuthenticated);

rolesRouter.get(
  '/',
  accessControll('create_roles'),
  listRolesController.handle,
);
rolesRouter.post(
  '/',
  accessControll('create_roles'),
  createRoleController.handle,
);
export { rolesRouter };
