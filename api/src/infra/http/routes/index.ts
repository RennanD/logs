import { Router } from 'express';
import { sessionsRouter } from './sessions.routes';
import { studentsRouter } from './students.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/students', studentsRouter);

export { routes };
