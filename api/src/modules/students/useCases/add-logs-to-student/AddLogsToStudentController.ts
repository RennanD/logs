import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AddLogsToStudentUseCase } from './AddLogsToStudentUseCase';

export class AddLogsToStudentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const addLogsToStudent = container.resolve(AddLogsToStudentUseCase);

    await addLogsToStudent.run();

    return response.status(201).send();
  }
}
