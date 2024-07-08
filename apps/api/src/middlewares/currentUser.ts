import { Request, Response, NextFunction } from 'express';

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    // TODO: Fix this. Maybe via declare global
    req.currentUser = req.user; // Attach the user to the request object
  }
  next();
};
