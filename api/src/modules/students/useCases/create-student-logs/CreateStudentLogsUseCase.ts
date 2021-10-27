import { inject, injectable } from 'tsyringe';
import { ICreateStudentLogDTO } from '../../dtos/ICreateStudentLogDTO';
import { IStudentLogsRepository } from '../../repositories/IStudentLogsRepository';

@injectable()
export class CreateStudentLogsUseCase {
  constructor(
    @inject('StudentLogsRepository')
    private studentLogsRepository: IStudentLogsRepository,
  ) {}

  async run({
    name,
    student_id_keep,
    date,
    ip,
    url,
  }: ICreateStudentLogDTO): Promise<void> {
    await this.studentLogsRepository.create({
      name,
      student_id_keep,
      url,
      ip,
      date,
    });
  }
}
