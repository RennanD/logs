import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportStudentsUseCase } from './ImportStudentsUseCase';

export class ImportStudentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importStudents = container.resolve(ImportStudentsUseCase);

    if (file) {
      importStudents.run(file);
    }

    return response.status(201).send();
  }
}
