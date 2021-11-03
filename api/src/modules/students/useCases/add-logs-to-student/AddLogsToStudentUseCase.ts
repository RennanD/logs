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

  async run({ student_id_keep, logs }: IAddLogsToStudentsJob): Promise<void> {
    const student = await this.studentRepository.findByKeepId(student_id_keep);

    if (student) {
      await this.studentLogsRepository.createMany(logs);

      const totalLogs = await this.studentLogsRepository.countAll(
        student_id_keep,
      );

      const studentLogs = await this.studentLogsRepository.findAllByKeepId(
        student_id_keep,
        { limit: totalLogs },
      );

      const parsedLogs = studentLogs.map(log => log._id);

      student.student_logs = parsedLogs;

      await this.studentRepository.save(student);
    }
  }
}
