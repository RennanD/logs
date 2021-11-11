import { model, Schema, Document } from 'mongoose';
import { IRoleSchema } from './Role';

export interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: IRoleSchema;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
  },
  { timestamps: true },
);

export default model<IUserSchema>('User', UserSchema);
