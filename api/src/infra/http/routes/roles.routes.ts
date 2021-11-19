import { Router } from 'express';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateRoleController } from '../../../modules/users/useCases/create-role/CreateRoleController';
import { ListRolesController } from '../../../modules/users/useCases/list-roles/ListRolesController';
import { ShowRoleController } from '../../../modules/users/useCases/show-role/ShowRoleController';

const rolesRouter = Router();

const createRoleController = new CreateRoleController();
const listRolesController = new ListRolesController();
const showRoleController = new ShowRoleController();

rolesRouter.use(ensureAuthenticated);

rolesRouter.get('/', accessControll('list_roles'), listRolesController.handle);
rolesRouter.get(
  '/:role_id',
  accessControll('list_roles'),
  showRoleController.handle,
);

rolesRouter.post(
  '/',
  accessControll('create_roles'),
  createRoleController.handle,
);
export { rolesRouter };
