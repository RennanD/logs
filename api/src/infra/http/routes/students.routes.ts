import { Router } from 'express';

import multer from 'multer';

import { CreateStudentLogsController } from '../../../modules/students/useCases/create-student-logs/CreateStudentLogsController';
import { ImportStudentsController } from '../../../modules/students/useCases/import-students/ImportStudentsController';

import uploadConfig from '../../../configs/upload';

const studentsRouter = Router();
const upload = multer(uploadConfig);

const createStudentLogsController = new CreateStudentLogsController();
const importStudentsController = new ImportStudentsController();

studentsRouter.get('/', (request, response) => {
  return response.json({
    ok: true,
  });
});

studentsRouter.post(
  '/import',
  upload.single('file'),
  importStudentsController.handle,
);

studentsRouter.post('/logs', createStudentLogsController.handle);

export { studentsRouter };
