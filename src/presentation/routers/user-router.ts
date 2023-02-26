import express, { Request, Response } from 'express';
import { LoginUseCase } from '../../domain/interfaces/use-cases/user/login';
import { SignupUseCase } from '../../domain/interfaces/use-cases/user/signup';
import { loginSchema, signupSchema } from '../../schemas/user-schema';
import validate from '../../schemas/validate';

export default function UserRouter(
  loginUseCase: LoginUseCase,
  singupUseCase: SignupUseCase
) {
  const router = express.Router();

  router.post(
    '/signup',
    validate(signupSchema),
    async (req: Request, res: Response) => {
      try {
        await singupUseCase.execute(req.body);
        res.statusCode = 201;
        res.send({ message: 'Signed up succesfully' });
      } catch (err: any) {
        res.status(500).send({ message: err.message });
      }
    }
  );

  router.post(
    '/login',
    validate(loginSchema),
    async (req: Request, res: Response) => {
      try {
        const result = await loginUseCase.execute(req.body);
        res.statusCode = 201;
        res.send({ message: 'Loggedin', token: result });
      } catch (err: any) {
        res.status(500).send({ message: err.message });
      }
    }
  );

  return router;
}
