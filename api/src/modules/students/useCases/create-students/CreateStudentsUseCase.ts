import { inject, injectable } from 'tsyringe';
import { ICreateStudentDTO } from '../../dtos/ICreateStudentDTO';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

@injectable()
export class CreateStudentsUseCase {
  constructor(
    @inject('StudentsRepository')
    private studentRepository: IStudentsRepository,
  ) {}

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
