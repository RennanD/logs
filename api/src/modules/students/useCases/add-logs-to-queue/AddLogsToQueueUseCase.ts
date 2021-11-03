import { inject, injectable } from 'tsyringe';
import { IQueueProvider } from '../../../../infra/providers/IImportQueueProvider';
import { IAddLogsToQueueJob } from '../../jobs/IAddLogsToQueueJob';
import { IAddLogsToStudentsJob } from '../../jobs/IAddLogsToStudentsJob';

@injectable()
export class AddLogsToQueueUseCase {
  constructor(
    @inject('ImportStudentLogQueueProvider')
    private importStudentLogQueue: IQueueProvider,
  ) {}

  async run({ logs, students }: IAddLogsToQueueJob): Promise<void> {
    students.forEach(async student => {
      const studentLogs = logs.filter(
        log => log.student_id_keep === student.student_id_keep,
      );

      console.log(`fila criada para o aluno "${student.student_id_keep}"`);

      await this.importStudentLogQueue.addJob<IAddLogsToStudentsJob>({
        student_id_keep: student.student_id_keep,
        logs: studentLogs,
      });
    });
  }
}
