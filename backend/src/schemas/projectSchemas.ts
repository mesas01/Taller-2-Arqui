import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().max(800).optional().default('')
});
