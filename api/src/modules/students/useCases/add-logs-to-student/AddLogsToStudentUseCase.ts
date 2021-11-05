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

    // const totalLogs = await this.studentLogsRepository.countAll(
    //   student_id_keep,
    // );

    // const studentLogs = await this.studentLogsRepository.findAllByKeepId(
    //   student_id_keep,
    //   {
    //     limit: totalLogs,
    //   },
    // );

    const logsIds = logs.map(log => log._id!);

    await this.studentRepository.create({
      student_id_keep,
      name: logs[0].name,
      logs: logsIds,
    });

    console.log(`aluno ${student_id_keep} criado`);
  }
}
