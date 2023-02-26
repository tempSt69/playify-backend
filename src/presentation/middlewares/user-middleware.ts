import { UserRepositoryImpl } from '../../domain/repositories/user-repository';
import { Login } from '../../domain/use-cases/user/login';
import { Signup } from '../../domain/use-cases/user/signup';
import UserRouter from '../routers/user-router';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function getUserMiddleware(dataSource: any) {
  return UserRouter(
    new Login(new UserRepositoryImpl(dataSource)),
    new Signup(new UserRepositoryImpl(dataSource))
  );
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export interface AuthMiddleware extends Request {
  roles: string | string[];
}

export interface AuthPayload extends Request {
  role: string;
}

export const authMiddleware = (roles: string | string[]) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      (req as CustomRequest).token = decoded;
      const info = decoded as AuthPayload;

      if (roles && roles.length && !roles.includes(info.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      next();
    } catch (err) {
      res.status(401).send('Please authenticate');
    }
  };
};
