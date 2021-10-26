import { Router } from 'express';

const studentsRouter = Router();

studentsRouter.get('/', (request, response) => {
  return response.json({
    ok: true,
  });
});

export { studentsRouter };
