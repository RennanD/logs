import { Types } from 'mongoose';
import { IStudentsSchema } from '../infra/mongoose/schemas/Student';

interface IStudentLogs {
  _id?: Types.ObjectId;
  name: string;
  student_id_keep: string;
  url: string;
  ip: string;
  date: Date;
}

export interface IAddLogsToStudentsJob {
  student_id_keep: string;
  logs: IStudentLogs[];
}
