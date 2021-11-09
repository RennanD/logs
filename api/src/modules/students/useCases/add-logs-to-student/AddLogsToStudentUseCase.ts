import { inject, injectable } from 'tsyringe';

import { Schema, Types } from 'mongoose';

import { promisify } from 'util';
import { pipeline, Writable } from 'stream';

import { IStudentLogsRepository } from '../../repositories/IStudentLogsRepository';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

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
export class AddLogsToStudentUseCase {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
    @inject('StudentLogsRepository')
    private studentLogsRepository: IStudentLogsRepository,
  ) {}

  async run({ logs_stream }: IAddLogsToStudentsJob): Promise<void> {
    const { studentLogsRepository, studentsRepository } = this;

    const pipelineAsync = promisify(pipeline);

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

    await pipelineAsync(logs_stream, writableStream);
  }
}
