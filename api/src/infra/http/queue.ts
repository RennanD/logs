import 'reflect-metadata';
import '../container';

import { container } from 'tsyringe';
import { importQueue } from '../../modules/students/infra/lib/Queue';
import { ImportStudentLogsJob } from '../../modules/students/jobs/ImportStudentLogsJob';

const importStudentLogsJob = container.resolve(ImportStudentLogsJob);

importQueue.process(importStudentLogsJob.handle);
