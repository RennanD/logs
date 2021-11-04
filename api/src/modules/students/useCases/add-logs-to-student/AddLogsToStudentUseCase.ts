import { inject, injectable } from 'tsyringe';

import { IStudentLogsRepository } from '../../repositories/IStudentLogsRepository';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

import { IAddLogsToStudentsJob } from '../../jobs/IAddLogsToStudentsJob';

@injectable()
export class AddLogsToStudentUseCase {
  constructor(
    @inject('StudentsRepository')
    private studentRepository: IStudentsRepository,
    @inject('StudentLogsRepository')
    private studentLogsRepository: IStudentLogsRepository,
  ) {}

  async run({ logs, student_id_keep }: IAddLogsToStudentsJob): Promise<void> {
    // console.log({ data }, new Date());

    await this.studentLogsRepository.createMany(logs);

    const student = await this.studentRepository.findByKeepId(student_id_keep);

    const totalLogs = await this.studentLogsRepository.countAll(
      student_id_keep,
    );

    const studentLogs = await this.studentLogsRepository.findAllByKeepId(
      student_id_keep,
      {
        limit: totalLogs,
      },
    );

    const logsIds = studentLogs.map(log => log._id);

    if (student) {
      student.student_logs = [...logsIds];
      await this.studentRepository.save(student);
      console.log(`Logs criados para ${student.student_id_keep}`);
    }
  }
}
