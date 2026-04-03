import { ProjectModel } from '../models/Project';

export const projectRepository = {
  create(input: { title: string; description?: string; ownerId: string }) {
    return ProjectModel.create(input);
  },
  listByOwner(ownerId: string) {
    return ProjectModel.find({ ownerId }).sort({ createdAt: -1 });
  },
  findByIdAndOwner(projectId: string, ownerId: string) {
    return ProjectModel.findOne({ _id: projectId, ownerId });
  }
};
