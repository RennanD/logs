import { inject, injectable } from 'tsyringe';
import { IStudentsSchema } from '../../infra/mongoose/schemas/Student';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

interface IRequest {
  student_id_keep?: string;
  name?: string;
  limit?: number;
  offset?: number;
}

interface IResposne {
  result: IStudentsSchema[];
  total_students: number;
}

@injectable()
export class ListStudentsUseCase {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  async run({
    student_id_keep,
    name,
    limit,
    offset,
  }: IRequest): Promise<IResposne> {
    const students = await this.studentsRepository.findAll({
      name,
      student_id_keep,
      limit,
      offset,
    });

    const totalStudents = await this.studentsRepository.countAll({
      name,
      student_id_keep,
    });

    return {
      result: students,
      total_students: totalStudents,
    };
  }
}
