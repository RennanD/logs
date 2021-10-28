import { Router } from 'express';

import multer from 'multer';

import { CreateStudentLogsController } from '../../../modules/students/useCases/create-student-logs/CreateStudentLogsController';
import { ImportStudentsController } from '../../../modules/students/useCases/import-students/ImportStudentsController';

import uploadConfig from '../../../configs/upload';
import { ImportStudentLogsController } from '../../../modules/students/useCases/import-student-logs/ImportStudentLogsController';
import { ListStudentsController } from '../../../modules/students/useCases/list-students/ListStudentsController';
import { ListStudentLogsController } from '../../../modules/students/useCases/list-student-logs/ListStudentLogsController';
import { AddLogsToStudentController } from '../../../modules/students/useCases/add-logs-to-student/AddLogsToStudentController';

const studentsRouter = Router();
const upload = multer(uploadConfig);

const listStudentsController = new ListStudentsController();
const listStudentLogsController = new ListStudentLogsController();

const createStudentLogsController = new CreateStudentLogsController();
const addLogsToStudentController = new AddLogsToStudentController();

const importStudentsController = new ImportStudentsController();
const importStudentLogsController = new ImportStudentLogsController();

studentsRouter.get('/', listStudentsController.handle);
studentsRouter.get('/:student_id_keep/logs', listStudentLogsController.handle);

studentsRouter.post('/logs', createStudentLogsController.handle);
studentsRouter.post('/add-logs', addLogsToStudentController.handle);

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
