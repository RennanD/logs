import { Router } from 'express';

import multer from 'multer';

import { CreateStudentLogsController } from '../../../modules/students/useCases/create-student-logs/CreateStudentLogsController';
import { ImportStudentsController } from '../../../modules/students/useCases/import-students/ImportStudentsController';

import uploadConfig from '../../../configs/upload';
import { ImportStudentLogsController } from '../../../modules/students/useCases/import-student-logs/ImportStudentLogsController';
import { ListStudentsController } from '../../../modules/students/useCases/list-students/ListStudentsController';

const studentsRouter = Router();
const upload = multer(uploadConfig);

const listStudentsController = new ListStudentsController();

const createStudentLogsController = new CreateStudentLogsController();
const importStudentsController = new ImportStudentsController();
const importStudentLogsController = new ImportStudentLogsController();

studentsRouter.get('/', listStudentsController.handle);

studentsRouter.post(
  '/import',
  upload.single('file'),
  importStudentsController.handle,
);
studentsRouter.post(
  '/import/logs',
  upload.single('file'),
  importStudentLogsController.handle,
);

studentsRouter.post('/logs', createStudentLogsController.handle);

export { studentsRouter };
