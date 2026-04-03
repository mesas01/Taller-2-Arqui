import cors from 'cors';
import express from 'express';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { apiRoutes } from './routes';

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: env.allowedOrigins,
    credentials: true
  })
);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', apiRoutes);
app.use(errorHandler);
