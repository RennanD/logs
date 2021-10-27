import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateStudentsUseCase } from '../create-students/CreateStudentsUseCase';
import { CreateStudentLogsUseCase } from './CreateStudentLogsUseCase';

export class CreateStudentLogsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createStudents = container.resolve(CreateStudentsUseCase);
    const createStudentLogs = container.resolve(CreateStudentLogsUseCase);

    const { name, url, ip, date, student_id_keep } = request.body;

    // console.log(student_id_keep);

    // console.log(this.createStudentLogs);

    await createStudents.run({ name, student_id_keep });

    await createStudentLogs.run({
      date,
      ip,
      name,
      student_id_keep,
      url,
    });

    return response.status(201).send();
  }
}
