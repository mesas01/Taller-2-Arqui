import { Schema, model } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  passwordHash: string;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', userSchema);
