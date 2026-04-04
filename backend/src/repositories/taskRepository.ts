import { TaskModel, TaskStatus } from '../models/Task';

export const taskRepository = {
  create(input: { title: string; status: TaskStatus; projectId: string; assigneeId: string }) {
    return TaskModel.create(input);
  },
  listByProject(projectId: string) {
    return TaskModel.find({ projectId }).sort({ createdAt: -1 });
  },
  findByIdAndProject(taskId: string, projectId: string) {
    return TaskModel.findOne({ _id: taskId, projectId });
  },
  updateStatus(taskId: string, status: TaskStatus) {
    return TaskModel.findByIdAndUpdate(taskId, { status }, { new: true });
  }
};
