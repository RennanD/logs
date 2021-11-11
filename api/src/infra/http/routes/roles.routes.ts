import { Router } from 'express';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateRoleController } from '../../../modules/users/useCases/create-role/CreateRoleController';

const rolesRouter = Router();

const createRoleController = new CreateRoleController();

rolesRouter.use(ensureAuthenticated);
rolesRouter.use(accessControll('create_roles'));
rolesRouter.post('/', createRoleController.handle);

export { rolesRouter };
