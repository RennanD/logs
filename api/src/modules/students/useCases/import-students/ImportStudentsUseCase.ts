import csvParse from 'csv-parse';
import fs from 'fs';

import { inject, injectable } from 'tsyringe';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

import { ServerError } from '../../../../infra/errors/ServerError';

interface IImportStudents {
  name: string;
  student_id_keep: string;
}

@injectable()
export class ImportStudentsUseCase {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  private async loadStudents(
    file: Express.Multer.File,
  ): Promise<IImportStudents[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const students: IImportStudents[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, student_id_keep] = line;
          students.push({
            name,
            student_id_keep,
          });
        })
        .on('end', () => {
          resolve(students);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async run(file: Express.Multer.File): Promise<void> {
    try {
      const students = await this.loadStudents(file);

      students.map(async student => {
        const { name, student_id_keep } = student;

        const existentStudent = await this.studentsRepository.findByKeepId(
          student_id_keep,
        );

        if (!existentStudent) {
          this.studentsRepository.create({
            name,
            student_id_keep,
          });
        }
      });
    } catch (error) {
      throw new ServerError(error.message);
    }
  }
}
