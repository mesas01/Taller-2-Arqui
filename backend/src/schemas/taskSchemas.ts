import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(3).max(120),
  status: z.enum(['todo', 'in_progress', 'done']).default('todo'),
  assigneeId: z.string().min(1)
});

export const updateTaskStatusSchema = z.object({
  status: z.enum(['todo', 'in_progress', 'done'])
});
