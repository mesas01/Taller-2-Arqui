import { UserModel } from '../models/User';

export const userRepository = {
  findByEmail(email: string) {
    return UserModel.findOne({ email: email.toLowerCase() });
  },
  create(input: { name: string; email: string; passwordHash: string }) {
    return UserModel.create({ ...input, email: input.email.toLowerCase() });
  },
  findById(id: string) {
    return UserModel.findById(id);
  }
};
