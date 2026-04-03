import mongoose from 'mongoose';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../src/app';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('API E2E flow', () => {
  it('registers, creates project and creates task', async () => {
    const registerRes = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@taller.com',
      password: 'Test1234!'
    });

    expect(registerRes.status).toBe(201);
    const token = registerRes.body.data.token;
    const userId = registerRes.body.data.user.id;

    const projectRes = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Proyecto test', description: 'Descripcion' });

    expect(projectRes.status).toBe(201);
    const projectId = projectRes.body.data._id;

    const taskRes = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarea test', status: 'todo', assigneeId: userId });

    expect(taskRes.status).toBe(201);

    const tasksListRes = await request(app)
      .get(`/api/projects/${projectId}/tasks`)
      .set('Authorization', `Bearer ${token}`);

    expect(tasksListRes.status).toBe(200);
    expect(tasksListRes.body.data.length).toBe(1);
  });
});
