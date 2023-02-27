import request from 'supertest';
import { User } from '../../../src/domain/entities/user';
import UseRouter from '../../../src/presentation/routers/user-router';
import server from '../../../src/server';
import jwt from 'jsonwebtoken';
import { ROLES } from '../../../src/domain/entities/user';
import { LoginUseCase } from '../../../src/domain/interfaces/use-cases/user/login';
import { SignupUseCase } from '../../../src/domain/interfaces/use-cases/user/signup';
import UserRouter from '../../../src/presentation/routers/user-router';

class MockLoginUseCase implements LoginUseCase {
  execute(loginInfo: Pick<User, 'email' | 'hash'>): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

class MockSignupUseCase implements SignupUseCase {
  execute(): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}

describe('User router', () => {
  let mockSignupUseCase: SignupUseCase;
  let mockLoginUseCase: LoginUseCase;

  beforeAll(() => {
    mockSignupUseCase = new MockSignupUseCase();
    mockLoginUseCase = new MockLoginUseCase();

    server.use('/user', UserRouter(mockLoginUseCase, mockSignupUseCase));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /user/signup', () => {
    test('POST /user/signup returns 201', async () => {
      const InputData = {
        email: 'antoine@test.gg',
        hash: '12345678',
      };
      jest
        .spyOn(mockSignupUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server)
        .post('/user/signup')
        .send(InputData);
      expect(response.status).toBe(201);
    });

    test('POST /user/signup returns 500 on use case error', async () => {
      const InputData = {
        email: 'antoine@test.gg',
        hash: '12345678',
      };
      jest
        .spyOn(mockSignupUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server)
        .post('/user/signup')
        .send(InputData);
      expect(response.status).toBe(500);
    });
  });

  describe('POST /user/login', () => {
    test('POST /user/login returns 201', async () => {
      const InputData = {
        email: 'antoine@test.gg',
        hash: '12345678',
      };
      jest
        .spyOn(mockLoginUseCase, 'execute')
        .mockImplementation(() => Promise.resolve('jwt-token'));

      const response = await request(server)
        .post('/user/login')
        .send(InputData);
      expect(response.body.token).toBe('jwt-token');
      expect(response.status).toBe(201);
    });

    test('POST /user/login returns 500 on use case error', async () => {
      const InputData = {
        email: 'antoine@test.gg',
        hash: '12345678',
      };
      jest
        .spyOn(mockLoginUseCase, 'execute')
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server)
        .post('/user/login')
        .send(InputData);
      expect(response.status).toBe(500);
    });
  });
});
