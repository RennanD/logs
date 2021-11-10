import { model, Schema, Document } from 'mongoose';

export interface IPermissionSchema extends Document {
  title: string;
  slug: string;
}

const PermissionSchema = new Schema(
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
  },
  { timestamps: true },
);

export default model<IPermissionSchema>('Permission', PermissionSchema);
