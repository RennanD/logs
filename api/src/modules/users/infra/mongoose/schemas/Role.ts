import { model, Schema, Document } from 'mongoose';

export interface IRoleSchema extends Document {
  title: string;
  slug: string;
  permissions: Schema.Types.ObjectId[];
}

const RoleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export default model<IRoleSchema>('Role', RoleSchema);
