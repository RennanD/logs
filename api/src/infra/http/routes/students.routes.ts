import { Router } from 'express';

import multer from 'multer';

import { CreateStudentLogsController } from '../../../modules/students/useCases/create-student-logs/CreateStudentLogsController';
import { ImportStudentsController } from '../../../modules/students/useCases/import-students/ImportStudentsController';

import uploadConfig from '../../../configs/upload';
import { ImportStudentLogsController } from '../../../modules/students/useCases/import-student-logs/ImportStudentLogsController';
import { ListStudentsController } from '../../../modules/students/useCases/list-students/ListStudentsController';
import { ListStudentLogsController } from '../../../modules/students/useCases/list-student-logs/ListStudentLogsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { accessControll } from '../middlewares/accessControll';

const studentsRouter = Router();
const upload = multer(uploadConfig);

const listStudentsController = new ListStudentsController();
const listStudentLogsController = new ListStudentLogsController();

const createStudentLogsController = new CreateStudentLogsController();

const importStudentsController = new ImportStudentsController();
const importStudentLogsController = new ImportStudentLogsController();

studentsRouter.post('/logs', createStudentLogsController.handle);

// Authenticated Routes
studentsRouter.use(ensureAuthenticated);

// List Students Logs permission
studentsRouter.use(accessControll('list_student_logs'));
studentsRouter.get('/', listStudentsController.handle);
studentsRouter.get('/:student_id/logs', listStudentLogsController.handle);

// Import Logs Permissions
studentsRouter.use(accessControll('import_logs'));
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

export { studentsRouter };
