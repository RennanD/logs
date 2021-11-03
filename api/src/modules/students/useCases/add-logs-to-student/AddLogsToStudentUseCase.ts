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
      const newLog = await this.studentLogsRepository.create(logs);

      const verifyLog = await this.studentLogsRepository.findById(newLog._id);

      // const studentLogs = await this.studentLogsRepository.findAllByKeepId(
      //   student_id_keep,
      //   { limit: totalLogs },
      // );

      // const parsedLogs = studentLogs.map(log => log._id);

      if (verifyLog) {
        student.student_logs = [...student.student_logs, verifyLog._id];

        await this.studentRepository.save(student);

        console.log(`Log Adicionados para "${student.student_id_keep}"`);
      }
    }
  }
}
