import { Schema } from 'mongoose';
import { inject, injectable } from 'tsyringe';
import { IStudentLogSchema } from '../../infra/mongoose/schemas/StudentLog';
import { IStudentLogsRepository } from '../../repositories/IStudentLogsRepository';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

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

  async run(student_id: string): Promise<IResponse> {
    const existentStudent = await this.studentsRepository.findById(student_id);

    if (!existentStudent) {
      throw new Error('Este aluno não está nos logs');
    }

    return {
      student_name: existentStudent.name,
      result: existentStudent.student_logs,
      total_logs: existentStudent.student_logs.length,
    };
  }
}
