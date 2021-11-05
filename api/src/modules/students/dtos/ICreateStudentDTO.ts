import { Types } from 'mongoose';

export interface ICreateStudentDTO {
  name: string;
  student_id_keep: string;
  logs?: Types.ObjectId[];
}
