import { model, Schema } from 'mongoose';

export interface IStudentsSchema extends Document {
  _id: Schema.Types.ObjectId;
  student_id_keep: string;
  name: string;
}

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    student_keep_id: {
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
