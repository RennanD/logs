import { Router } from 'express';
import { sessionsRouter } from './sessions.routes';
import { studentsRouter } from './students.routes';

const routes = Router();

routes.use('/students', studentsRouter);
routes.use('/sessions', sessionsRouter);

export { routes };
