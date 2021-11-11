import { Router } from 'express';

import { ListPermissionsController } from '../../../modules/users/useCases/list-permissions/ListPermissionsController';
import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const permissionsRouter = Router();

const listPermissionsController = new ListPermissionsController();

permissionsRouter.use(ensureAuthenticated);

permissionsRouter.get(
  '/',
  accessControll('list_permissions'),
  listPermissionsController.handle,
);

export { permissionsRouter };
