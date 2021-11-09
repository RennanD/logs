import { inject, injectable } from 'tsyringe';
import { ICreateStudentLogDTO } from '../../dtos/ICreateStudentLogDTO';
import { IStudentLogsRepository } from '../../repositories/IStudentLogsRepository';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

@injectable()
export class CreateStudentLogsUseCase {
  constructor(
    @inject('StudentLogsRepository')
    private studentLogsRepository: IStudentLogsRepository,
    @inject('StudentsRepository')
    private studentRepository: IStudentsRepository,
  ) {}

  async run({
    name,
    student_id_keep,
    date,
    ip,
    url,
  }: ICreateStudentLogDTO): Promise<void> {
    const log = await this.studentLogsRepository.create({
      name,
      student_id_keep,
      url,
      ip,
      date,
    });

    const existentStudent = await this.studentRepository.findByKeepId(
      student_id_keep,
    );

    if (existentStudent) {
      existentStudent.student_logs = [...existentStudent.student_logs, log._id];
      await this.studentRepository.save(existentStudent);

      return;
    }

    await this.studentRepository.create({
      name,
      student_id_keep,
      logs: [log._id],
    });
  }
}
