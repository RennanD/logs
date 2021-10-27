import { Router } from 'express';
import { CreateStudentLogsController } from '../../../modules/students/useCases/create-student-logs/CreateStudentLogsController';

const studentsRouter = Router();

const createStudentLogsController = new CreateStudentLogsController();

studentsRouter.get('/', (request, response) => {
  return response.json({
    ok: true,
  });
});

studentsRouter.post('/logs', createStudentLogsController.handle);

export { studentsRouter };
