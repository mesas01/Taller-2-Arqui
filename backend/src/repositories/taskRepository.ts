import { TaskModel, TaskStatus } from '../models/Task';

export const taskRepository = {
  create(input: { title: string; status: TaskStatus; projectId: string; assigneeId: string }) {
    return TaskModel.create(input);
  },
  listByProject(projectId: string) {
    return TaskModel.find({ projectId }).sort({ createdAt: -1 });
  }
};
