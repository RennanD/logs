import { inject, injectable } from 'tsyringe';
import { IStudentsSchema } from '../../infra/mongoose/schemas/Student';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

interface IRequest {
  search?: string;
  limit?: string;
  page?: string;
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
    search,
    limit = '10',
    page = '1',
  }: IRequest): Promise<IResposne> {
    const offset = (Number(page) - 1) * Number(limit);

    const students = await this.studentsRepository.findAll({
      search,
      limit: Number(limit),
      offset,
    });

    const totalStudents = await this.studentsRepository.countAll({
      search,
    });

    return {
      result: students,
      total_students: totalStudents,
    };
  }
}
