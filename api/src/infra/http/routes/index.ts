import { Router } from 'express';

import { permissionsRouter } from './permissions.routes';
import { sessionsRouter } from './sessions.routes';
import { studentsRouter } from './students.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/students', studentsRouter);
routes.use('/permissions', permissionsRouter);

export { routes };
