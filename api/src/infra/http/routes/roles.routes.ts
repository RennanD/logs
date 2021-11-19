import { Router } from 'express';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateRoleController } from '../../../modules/users/useCases/create-role/CreateRoleController';
import { ListRolesController } from '../../../modules/users/useCases/list-roles/ListRolesController';
import { ShowRoleController } from '../../../modules/users/useCases/show-role/ShowRoleController';
import { EditRoleController } from '../../../modules/users/useCases/edit-role/EditRoleController';

const rolesRouter = Router();

const createRoleController = new CreateRoleController();
const listRolesController = new ListRolesController();
const showRoleController = new ShowRoleController();
const editRoleController = new EditRoleController();

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

rolesRouter.put(
  '/:role_id',
  accessControll('edit_roles'),
  editRoleController.handle,
);
export { rolesRouter };
