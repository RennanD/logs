import { IStudentsSchema } from '../infra/mongoose/schemas/Student';

interface IStudentLogs {
  name: string;
  student_id_keep: string;
  url: string;
  ip: string;
  date: Date;
}

export interface IAddLogsToQueueJob {
  students: IStudentsSchema[];
  logs: IStudentLogs[];
}
