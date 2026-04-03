import { Schema, model, Types } from 'mongoose';

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface TaskDocument {
  title: string;
  status: TaskStatus;
  projectId: Types.ObjectId;
  assigneeId: Types.ObjectId;
}

const taskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['todo', 'in_progress', 'done'],
      default: 'todo',
      required: true
    },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    assigneeId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }
  },
  { timestamps: true }
);

export const TaskModel = model<TaskDocument>('Task', taskSchema);
