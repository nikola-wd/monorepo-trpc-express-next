// import { User } from './your-user-model-path'; // Adjust the import path to your actual User model

// TODO: duplicate
export interface ICurrentUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: ICurrentUser;
    }
  }
}

export {};
