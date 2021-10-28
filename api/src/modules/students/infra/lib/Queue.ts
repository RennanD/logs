import Queue from 'bull';
import { container } from 'tsyringe';
import redisConfig from '../../../../configs/redis';

import { ImportStudentLogsJob } from '../../jobs/ImportStudentLogsJob';

const importStudentLogsJob = container.resolve(ImportStudentLogsJob);

const importQueue = new Queue(importStudentLogsJob.key, {
  redis: redisConfig,
});

export { importQueue };
