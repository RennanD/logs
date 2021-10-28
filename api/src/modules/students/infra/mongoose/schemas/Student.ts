import { model, Schema, Document } from 'mongoose';

export interface IStudentsSchema extends Document {
  student_id_keep: string;
  name: string;
}

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    student_id_keep: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IStudentsSchema>('Student', StudentSchema);
