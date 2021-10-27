import { ICreateStudentLogDTO } from '../../dtos/ICreateStudentLogDTO';
import { IStudentLogsRepository } from '../../repositories/IStudentLogsRepository';

export class CreateStudentLogsUseCase {
  constructor(private studentLogsRepository: IStudentLogsRepository) {}

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
