import { Router } from 'express';

import { CreateUserController } from '../../../modules/users/useCases/create-user/CreateUserController';
import { ListUsersController } from '../../../modules/users/useCases/list-users/ListUsersController';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', accessControll('list_users'), listUsersController.handle);

usersRouter.post(
  '/',
  accessControll('create_users'),
  createUserController.handle,
);

export { usersRouter };
