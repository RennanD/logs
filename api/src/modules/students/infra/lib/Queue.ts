import Queue from 'bull';
import IoRedis from 'ioredis';
import { container } from 'tsyringe';
import redisConfig from '../../../../configs/redis';

import { ImportStudentLogsJob } from '../../jobs/ImportStudentLogsJob';

const importStudentLogsJob = container.resolve(ImportStudentLogsJob);

const redisClient = new IoRedis({
  host: redisConfig.host,
  port: redisConfig.port,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

const importQueue = new Queue(importStudentLogsJob.key, {
  redis: redisConfig,
  createClient(): IoRedis.Redis {
    return redisClient;
  },
});

importQueue.on('completed', job => {
  console.log(job);
});

importQueue.on('progress', job => {
  console.log(job);
});

importQueue.on('failed', job => {
  console.log(job);
});

export { importQueue };
