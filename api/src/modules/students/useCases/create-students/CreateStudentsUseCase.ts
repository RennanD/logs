import { ICreateStudentDTO } from '../../dtos/ICreateStudentDTO';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

export class CreateStudentsUseCase {
  constructor(private studentRepository: IStudentsRepository) {}

  async run({ name, student_id_keep }: ICreateStudentDTO): Promise<void> {
    const existentStudent = await this.studentRepository.findByKeepId(
      student_id_keep,
    );

    if (existentStudent) return;

    await this.studentRepository.create({
      name,
      student_id_keep,
    });
  }
}
