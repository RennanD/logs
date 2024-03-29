export interface IQueueProvider {
  addJob<T>(job: T, name?: string): Promise<void>;
  addManyJobs<T>(name: string, jobs: T[]): Promise<void>;
  process<T>(
    processFunction: (job: T) => Promise<void>,
    concurrency?: number,
  ): void;
  // on<T, R>(option: T, callback: (job: R) => void): void;
}
