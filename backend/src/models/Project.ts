import { Schema, model, Types } from 'mongoose';

export interface ProjectDocument {
  title: string;
  description?: string;
  ownerId: Types.ObjectId;
}

const projectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }
  },
  { timestamps: true }
);

export const ProjectModel = model<ProjectDocument>('Project', projectSchema);
