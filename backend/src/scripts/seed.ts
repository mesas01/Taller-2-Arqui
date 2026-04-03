import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { env } from '../config/env';
import { ProjectModel } from '../models/Project';
import { TaskModel } from '../models/Task';
import { UserModel } from '../models/User';

async function runSeed() {
  await mongoose.connect(env.mongoUri);

  await TaskModel.deleteMany({});
  await ProjectModel.deleteMany({});
  await UserModel.deleteMany({});

  const user = await UserModel.create({
    name: 'Demo User',
    email: env.seedUserEmail,
    passwordHash: await bcrypt.hash(env.seedUserPassword, 10)
  });

  const project = await ProjectModel.create({
    title: 'Proyecto Inicial',
    description: 'Proyecto semilla para pruebas de flujo E2E',
    ownerId: user._id
  });

  await TaskModel.create({
    title: 'Tarea de ejemplo',
    status: 'todo',
    projectId: project._id,
    assigneeId: user._id
  });

  console.log('Seed completed with user:', env.seedUserEmail);
  await mongoose.disconnect();
}

runSeed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
