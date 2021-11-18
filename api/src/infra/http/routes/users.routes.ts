import { Router } from 'express';

import { CreateUserController } from '../../../modules/users/useCases/create-user/CreateUserController';
import { ListUsersController } from '../../../modules/users/useCases/list-users/ListUsersController';
import { ShowUserController } from '../../../modules/users/useCases/show-user/ShowUserController';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const showUserController = new ShowUserController();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', accessControll('list_users'), listUsersController.handle);
usersRouter.get(
  '/:user_id',
  accessControll('list_users'),
  showUserController.handle,
);

usersRouter.post(
  '/',
  accessControll('create_users'),
  createUserController.handle,
);

export { usersRouter };
