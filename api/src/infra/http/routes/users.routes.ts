import { Router } from 'express';

import { CreateUserController } from '../../../modules/users/useCases/create-user/CreateUserController';
import { EditUserController } from '../../../modules/users/useCases/edit-user/EditUserController';
import { ListUsersController } from '../../../modules/users/useCases/list-users/ListUsersController';
import { ShowUserController } from '../../../modules/users/useCases/show-user/ShowUserController';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const showUserController = new ShowUserController();
const editUserController = new EditUserController();

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

usersRouter.put(
  '/:user_id',
  accessControll('edit_users'),
  editUserController.handle,
);

export { usersRouter };
