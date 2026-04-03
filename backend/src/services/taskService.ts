import { taskRepository } from '../repositories/taskRepository';
import { projectService } from './projectService';
import { AppError } from '../utils/appError';
import { TaskStatus } from '../models/Task';

export const taskService = {
  async create(input: {
    title: string;
    status: TaskStatus;
    projectId: string;
    assigneeId: string;
    ownerId: string;
  }) {
    const project = await projectService.findByIdAndOwner(input.projectId, input.ownerId);
    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return taskRepository.create({
      title: input.title,
      status: input.status,
      projectId: input.projectId,
      assigneeId: input.assigneeId
    });
  },

  async listByProject(projectId: string, ownerId: string) {
    const project = await projectService.findByIdAndOwner(projectId, ownerId);
    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return taskRepository.listByProject(projectId);
  }
};
