import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import csvParse from 'csv-parse';

import { Types } from 'mongoose';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';
import { IQueueProvider } from '../../../../infra/providers/IImportQueueProvider';
import { IAddLogsToStudentsJob } from '../../jobs/IAddLogsToStudentsJob';

interface IImportStudentLogs {
  student_id_keep: string;
  logs: {
    _id?: Types.ObjectId;
    name: string;
    student_id_keep: string;
    url: string;
    ip: string;
    date: Date;
  }[];
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
          const [name, student_id_keep, ip, url, date] = line;

          const _id = new Types.ObjectId();

          const findStudentIndex = studentLogs.findIndex(
            studentLog => studentLog.student_id_keep === student_id_keep,
          );

          if (findStudentIndex >= 0) {
            studentLogs[findStudentIndex].logs.push({
              _id,
              name,
              student_id_keep,
              ip,
              url,
              date,
            });
          } else {
            studentLogs.push({
              student_id_keep,
              logs: [{ _id, name, student_id_keep, ip, url, date }],
            });
          }

          // console.log(`Log adicionado na fila [${new Date().getTime()}]`);
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
    console.log('começou', new Date());

    const logs = await this.loadStudents(file);

    await this.addLogToQueue.addManyJobs<IAddLogsToStudentsJob>(
      'add-logs',
      logs,
    );

    // // console.log({ studentLogs });

    // const totalStudents = await this.stutendsRespository.countAll();

    // const students = await this.stutendsRespository.findAll({
    //   limit: totalStudents,
    // });

    // const parsedLogs = students.map(student => {
    //   const logs = studentLogs.filter(
    //     log => log.student_id_keep === student.student_id_keep,
    //   );

    //   return {
    //     student,
    //     logs,
    //   };
    // });

    // // console.log(parsedLogs);

    // console.log('terminou', new Date());

    // parsedLogs.forEach(async jobData => {
    //   console.log(`${jobData.student.student_id_keep}, na fila`);

    //   await this.addLogToQueue.addJob<IAddLogsToStudentsJob>({
    //     student: jobData.student,
    //     logs: jobData.logs,
    //   });
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
