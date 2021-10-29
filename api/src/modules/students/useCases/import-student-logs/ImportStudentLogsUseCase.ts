import fs from 'fs';
import csvParse from 'csv-parse';

import { inject, injectable } from 'tsyringe';
import { IStudentLogsRepository } from '../../repositories/IStudentLogsRepository';
import { importQueue } from '../../infra/lib/Queue';

interface IImportStudentLogs {
  name: string;
  student_id_keep: string;
  url: string;
  ip: string;
  date: Date;
}

@injectable()
export class ImportStudentLogsUseCase {
  constructor(
    @inject('StudentLogsRepository')
    private studentLogsRepository: IStudentLogsRepository,
  ) {}

  private async loadStudents(
    file: Express.Multer.File,
  ): Promise<IImportStudentLogs[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const studentLogs: IImportStudentLogs[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [, name, student_id_keep, ip, url, date] = line;
          studentLogs.push({
            name,
            student_id_keep,
            ip,
            url,
            date,
          });
        })
        .on('end', () => {
          resolve(studentLogs);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async run(file: Express.Multer.File): Promise<void> {
    const studentLogs = await this.loadStudents(file);

    const logs = studentLogs.filter(log => log.student_id_keep === '4115');

    console.log(logs.length);

    await importQueue.add({ studentd_id_keep: '4115', logs });

    // console.log('teste')
  }
}
