import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 5000),
  mongoUri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/taller2_arqui',
  jwtSecret: process.env.JWT_SECRET ?? 'change_this_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000').split(','),
  seedUserEmail: process.env.SEED_USER_EMAIL ?? 'demo@taller.com',
  seedUserPassword: process.env.SEED_USER_PASSWORD ?? 'Demo1234!'
};
