import { inject, injectable } from 'tsyringe';

import fs from 'fs';
import { pipeline, Readable, Writable } from 'stream';
import { promisify } from 'util';

import csvParse from 'csv-parse';

import { Schema, Types } from 'mongoose';

import { IStudentsRepository } from '../../repositories/IStudentsRepository';
import { IStudentLogsRepository } from '../../repositories/IStudentLogsRepository';

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
    private studentsRepository: IStudentsRepository,
    @inject('StudentLogsRepository')
    private studentLogsRepository: IStudentLogsRepository,
  ) {}

  async run(file: Express.Multer.File): Promise<void> {
    const pipelineAsync = promisify(pipeline);

    const { studentsRepository, studentLogsRepository } = this;

    console.log('começou', new Date());

    const readableStream = new Readable({
      async read() {
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
            studentLogs.forEach(log => {
              this.push(JSON.stringify(log));
            });
            this.push(null);
            console.log('leu tudo');
          });
      },
    });

    const writableStream = new Writable({
      async write(chunk, encoding, cb) {
        const data: IImportStudentLogs = JSON.parse(chunk);

        const { student_id_keep, logs } = data;

        await studentLogsRepository.createMany(logs);

        const student = await studentsRepository.findByKeepId(student_id_keep);

        if (student) {
          const logsIds = logs.map(
            log => log._id! as unknown as Schema.Types.ObjectId,
          );
          student.student_logs = [...student.student_logs, ...logsIds];
          studentsRepository.save(student);

          console.log(`logs adicionados para ${student_id_keep}`);

          return;
        }

        const logsIds = logs.map(log => log._id!);

        await studentsRepository.create({
          student_id_keep,
          name: logs[0].name,
          logs: logsIds,
        });

        console.log(`aluno ${student_id_keep} criado`);

        cb();
      },
    });

    await pipelineAsync(readableStream, writableStream);
  }
}
