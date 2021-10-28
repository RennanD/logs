import { inject, injectable } from 'tsyringe';
import { IStudentLogSchema } from '../../infra/mongoose/schemas/StudentLog';
import { IStudentLogsRepository } from '../../repositories/IStudentLogsRepository';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

interface IRequestParams {
  url?: string;
  limit?: number;
  offset?: number;
}

interface IResponse {
  student_name: string;
  result: IStudentLogSchema[];
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
    student_id_keep: string,
    { url, limit, offset }: IRequestParams,
  ): Promise<IResponse> {
    const existentStudent = await this.studentsRepository.findByKeepId(
      student_id_keep,
    );

    if (!existentStudent) {
      throw new Error('Este aluno não está nos logs');
    }

    const logs = await this.studentLogsRepository.findAllByKeepId(
      student_id_keep,
      { url, limit, offset },
    );

    const totalLogs = await this.studentLogsRepository.countAll(
      student_id_keep,
      url,
    );

    return {
      student_name: existentStudent.name,
      result: logs,
      total_logs: totalLogs,
    };
  }
}
