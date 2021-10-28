import { model, Schema, Document } from 'mongoose';

export interface IStudentsSchema extends Document {
  student_id_keep: string;
  name: string;
  student_logs: Schema.Types.ObjectId[];
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
    student_logs: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'StudentLog',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default model<IStudentsSchema>('Student', StudentSchema);
