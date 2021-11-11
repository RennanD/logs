import { Router } from 'express';

import { CreateUserController } from '../../../modules/users/useCases/create-user/CreateUserController';
import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.use(ensureAuthenticated);
usersRouter.use(accessControll('create_users'));

usersRouter.post('/', createUserController.handle);

export { usersRouter };
