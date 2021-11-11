import { Router } from 'express';

import { CreateUserController } from '../../../modules/users/useCases/create-user/CreateUserController';
import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.use(ensureAuthenticated);

usersRouter.post(
  '/',
  accessControll('create_users'),
  createUserController.handle,
);

export { usersRouter };
