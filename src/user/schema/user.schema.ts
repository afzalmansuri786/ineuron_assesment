import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { v4 } from 'uuid';
import { UserSchemaI } from '../interface/user.interface';

export const UserSchema = new mongoose.Schema<UserSchemaI>(
  {
    userId: {
      type: String,
      default: v4,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'inactive'],
    },
  },
  { timestamps: true, versionKey: false },
);

export const USER_MONGOOSE_PROVIDER = 'UserPractice';

export const USER_COLLECTION_NAME = 'userspractice';

export const UserMongooseModule = MongooseModule.forFeature([
  {
    name: USER_MONGOOSE_PROVIDER,
    schema: UserSchema,
    collection: USER_COLLECTION_NAME,
  },
]);
