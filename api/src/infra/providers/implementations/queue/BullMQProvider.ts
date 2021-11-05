import { Queue, Worker, Processor, QueueScheduler } from 'bullmq';

import { IQueueProvider } from '../../IImportQueueProvider';

const REDIS_CONFIG = {
  host: '127.0.0.1',
  port: 6379,
  db: 0,
};

export class BullMQProvider implements IQueueProvider {
  private queue: Queue;

  private queueName: string;

  constructor(queue_name: string) {
    this.queueName = queue_name;
    this.queue = new Queue(queue_name, {
      connection: REDIS_CONFIG,
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
    await this.queue.add(name!, { data: job });
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
      connection: REDIS_CONFIG,
      concurrency,
      limiter: {
        max: 400,
        duration: 1000,
      },
    });

    new QueueScheduler(this.queueName, {
      connection: REDIS_CONFIG,
    });
  }
}
