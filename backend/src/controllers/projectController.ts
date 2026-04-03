import { Request, Response } from 'express';
import { projectService } from '../services/projectService';
import { ok } from '../utils/apiResponse';

export const projectController = {
  async create(req: Request, res: Response) {
    const ownerId = req.user!.userId;
    const project = await projectService.create({ ...req.body, ownerId });
    return res.status(201).json(ok(project));
  },

  async listMine(req: Request, res: Response) {
    const ownerId = req.user!.userId;
    const projects = await projectService.listByOwner(ownerId);
    return res.status(200).json(ok(projects));
  }
};
