import { inject, injectable } from 'tsyringe';
import { IStudentsSchema } from '../../infra/mongoose/schemas/Student';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

interface IRequest {
  search?: string;
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

  async run({ search, limit, offset }: IRequest): Promise<IResposne> {
    const students = await this.studentsRepository.findAll({
      search,
      limit,
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
