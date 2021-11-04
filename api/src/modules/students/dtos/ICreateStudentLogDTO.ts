import { Types } from 'mongoose';

export interface ICreateStudentLogDTO {
  _id?: Types.ObjectId;
  name: string;
  student_id_keep: string;
  url: string;
  ip: string;
  date: Date;
}
