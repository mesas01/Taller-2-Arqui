import { Router } from 'express';
import { projectController } from '../controllers/projectController';
import { taskController } from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validate';
import { createProjectSchema } from '../schemas/projectSchemas';
import { createTaskSchema } from '../schemas/taskSchemas';

export const projectRoutes = Router();

projectRoutes.use(authMiddleware);
projectRoutes.get('/', projectController.listMine);
projectRoutes.post('/', validateBody(createProjectSchema), projectController.create);
projectRoutes.get('/:id/tasks', taskController.listByProject);
projectRoutes.post('/:id/tasks', validateBody(createTaskSchema), taskController.create);
