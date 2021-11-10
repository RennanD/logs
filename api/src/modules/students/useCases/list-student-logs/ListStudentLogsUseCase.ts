import { Schema } from 'mongoose';
import { inject, injectable } from 'tsyringe';
import { IStudentLogSchema } from '../../infra/mongoose/schemas/StudentLog';
import { IStudentLogsRepository } from '../../repositories/IStudentLogsRepository';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

interface IRequestParams {
  page?: string;
  limit?: string;
  url?: string;
}

interface IResponse {
  student_name: string;
  result: IStudentLogSchema[] | Schema.Types.ObjectId[];
  total_logs: number;
}

@injectable()
export class ListStudentLogsUseCase {
  constructor(
    @inject('StudentLogsRepository')
    private studentLogsRepository: IStudentLogsRepository,

    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  async run(
    student_id: string,
    { limit = '20', page = '1', url = '' }: IRequestParams,
  ): Promise<IResponse> {
    const existentStudent = await this.studentsRepository.findById(student_id);

    if (!existentStudent) {
      throw new Error('Este aluno não está nos logs');
    }

    const totalResults = existentStudent.student_logs.filter(log => {
      const parsedLog = log as unknown as IStudentLogSchema;

      return parsedLog.url.includes(url);
    });

    const result = totalResults.slice(
      (Number(page) - 1) * Number(limit),
      Number(page) * Number(limit),
    );

    return {
      student_name: existentStudent.name,
      result,
      total_logs: totalResults.length,
    };
  }
}
