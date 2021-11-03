import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import csvParse from 'csv-parse';

import { IStudentsRepository } from '../../repositories/IStudentsRepository';
import { IQueueProvider } from '../../../../infra/providers/IImportQueueProvider';
import { IAddLogsToStudentsJob } from '../../jobs/IAddLogsToStudentsJob';

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
    @inject('StudentsRepository')
    private stutendsRespository: IStudentsRepository,
    @inject('AddLogToQueueProvider')
    private addLogToQueue: IQueueProvider,
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

          await this.addLogToQueue.addJob<IAddLogsToStudentsJob>({
            student_id_keep,
            logs: {
              name,
              student_id_keep,
              ip,
              url,
              date,
            },
          });

          console.log(`Log adicionado na fila [${new Date().getTime()}]`);
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

    console.log(studentLogs.length);

    // const totalStudents = await this.stutendsRespository.countAll();

    // const students = await this.stutendsRespository.findAll({
    //   limit: totalStudents,
    // });

    // const parsedLogs = students.map(student => {
    //   console.log(student.student_id_keep);

    //   const logs = studentLogs.filter(
    //     log => log.student_id_keep === student.student_id_keep,
    //   );

    //   return {
    //     student,
    //     logs,
    //   };
    // });

    // console.log(parsedLogs);

    // const packageJobs = [];
    // const slice = 100;

    // for (let count = 0; count < parsedLogs.length; count += slice) {
    //   packageJobs.push(parsedLogs.slice(count, count + slice));
    // }

    // console.log(packageJobs);

    // Promise.all(

    // );

    // console.log(`fila criada para o aluno "${student.student_id_keep}"`);

    // const parsedLogs = studentLogs.filter(
    //   log => log.student_id_keep === '4115',
    // );

    // await this.importStudentLogQueue.addJob<IAddLogsToStudentsJob>({
    //   student_id_keep: '4115',
    //   logs: parsedLogs,
    // });
  }
}
