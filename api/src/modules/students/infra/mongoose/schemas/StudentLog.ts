import { model, Schema, Document } from 'mongoose';

export interface IStudentLogSchema extends Document {
  name: string;
  student_id_keep: string;
  url: string;
  ip: string;
  date: Date;
}

const StudentLogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    student_keep_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IStudentLogSchema>('StudentLog', StudentLogSchema);
