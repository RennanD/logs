import { Queue, Worker, Processor, QueueScheduler } from 'bullmq';

import { IQueueProvider } from '../../IImportQueueProvider';

import redisConfig from '../../../../configs/redis';

export class BullMQProvider implements IQueueProvider {
  private queue: Queue;

  private queueName: string;

  constructor(queue_name: string) {
    this.queueName = queue_name;
    this.queue = new Queue(queue_name, {
      connection: redisConfig,
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    });
  }

  async addJob<T>(job: T, name?: string): Promise<void> {
    await this.queue.add(name!, job, { delay: 3000 });
  }

  async addManyJobs<T>(name: string, jobs: T[]): Promise<void> {
    const parsedJobs = jobs.map(jobData => {
      return {
        name,
        data: jobData,
      };
    });

    await this.queue.addBulk(parsedJobs);
  }

  process<T>(
    processFunction: (job: T) => Promise<void>,
    concurrency = 1,
  ): void {
    const processor: Processor = async ({ data }) => {
      processFunction(data);
    };

    new Worker(this.queueName, processor, {
      connection: redisConfig,
      concurrency,
      limiter: {
        max: 400,
        duration: 1000,
      },
    });

    new QueueScheduler(this.queueName, {
      connection: redisConfig,
    });
  }
}
