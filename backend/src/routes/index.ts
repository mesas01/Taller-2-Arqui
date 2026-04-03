import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { projectRoutes } from './projectRoutes';

export const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/projects', projectRoutes);
