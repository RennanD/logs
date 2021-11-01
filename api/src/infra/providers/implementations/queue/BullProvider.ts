import Queue, { Queue as IQueue } from 'bull';

import { IQueueProvider } from '../../IImportQueueProvider';

export class BullProvider implements IQueueProvider {
  private queue: IQueue;

  constructor(queueName: string) {
    this.queue = new Queue(queueName);
  }

  async addJob<T>(job: T): Promise<void> {
    await this.queue.add(job);
  }

  async addManyJobs<T>(name: string, jobs: T[]): Promise<void> {
    const parsedJobs = jobs.map(jobData => ({
      name,
      data: jobData,
    }));

    await this.queue.addBulk(parsedJobs);
  }

  process<T>(processFunction: (job: T) => Promise<void>): void {
    this.queue.process(job => {
      processFunction(job.data);
    });
  }
}
