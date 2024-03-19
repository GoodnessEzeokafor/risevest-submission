import { ReconUserType } from './types';

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: number;
        username: string;
        fullName: string;
        firstName: string;
        lastName: string;
        email: string;
      };
    }
  }
}
