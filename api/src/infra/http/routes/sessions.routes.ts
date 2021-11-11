import { Router } from 'express';
import { AuthenticateUserController } from '../../../modules/users/useCases/authenticate-user/AuthenticateUserController';

const sessionsRouter = Router();

const authenticateUserController = new AuthenticateUserController();

sessionsRouter.post('/', authenticateUserController.handle);

export { sessionsRouter };
