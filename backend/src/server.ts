import mongoose from 'mongoose';
import { app } from './app';
import { env } from './config/env';

async function bootstrap() {
  await mongoose.connect(env.mongoUri);
  app.listen(env.port, () => {
    console.log(`Backend running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
