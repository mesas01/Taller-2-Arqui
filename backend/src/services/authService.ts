import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { userRepository } from '../repositories/userRepository';
import { AppError } from '../utils/appError';

export const authService = {
  async register(input: { name: string; email: string; password: string }) {
    const exists = await userRepository.findByEmail(input.email);
    if (exists) {
      throw new AppError('Email already in use', 409);
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash
    });

    const signOptions: SignOptions = { expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'] };
    const token = jwt.sign({ userId: user._id.toString(), email: user.email }, env.jwtSecret, signOptions);

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    };
  },

  async login(input: { email: string; password: string }) {
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      throw new AppError('Invalid credentials', 401);
    }

    const signOptions: SignOptions = { expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'] };
    const token = jwt.sign({ userId: user._id.toString(), email: user.email }, env.jwtSecret, signOptions);

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    };
  }
};
