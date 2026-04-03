import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { ok } from '../utils/apiResponse';

export const authController = {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);
    return res.status(201).json(ok(result));
  },
  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);
    return res.status(200).json(ok(result));
  }
};
