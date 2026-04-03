import { projectRepository } from '../repositories/projectRepository';

export const projectService = {
  create(input: { title: string; description?: string; ownerId: string }) {
    return projectRepository.create(input);
  },
  listByOwner(ownerId: string) {
    return projectRepository.listByOwner(ownerId);
  },
  findByIdAndOwner(projectId: string, ownerId: string) {
    return projectRepository.findByIdAndOwner(projectId, ownerId);
  }
};
