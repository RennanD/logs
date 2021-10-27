import { Request, Response } from 'express';
import { CreateStudentsUseCase } from '../create-students/CreateStudentsUseCase';
import { CreateStudentLogsUseCase } from './CreateStudentLogsUseCase';

export class CreateStudentLogsController {
  constructor(
    private createStudents: CreateStudentsUseCase,
    private createStudentLogs: CreateStudentLogsUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, url, ip, date, student_id_keep } = request.body;

    await this.createStudents.run({ name, student_id_keep });

    await this.createStudentLogs.run({
      date,
      ip,
      name,
      student_id_keep,
      url,
    });

    return response.status(201).send();
  }
}
