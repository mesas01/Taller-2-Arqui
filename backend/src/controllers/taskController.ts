import { Request, Response } from 'express';
import { taskService } from '../services/taskService';
import { ok } from '../utils/apiResponse';

export const taskController = {
  async create(req: Request, res: Response) {
    const ownerId = req.user!.userId;
    const task = await taskService.create({
      ...req.body,
      projectId: req.params.id,
      ownerId
    });
    return res.status(201).json(ok(task));
  },

  async listByProject(req: Request, res: Response) {
    const ownerId = req.user!.userId;
    const tasks = await taskService.listByProject(req.params.id, ownerId);
    return res.status(200).json(ok(tasks));
  }
};
