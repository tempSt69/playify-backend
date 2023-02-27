import { User } from '../../../src/domain/entities/user';
import { UserRepository } from '../../../src/domain/interfaces/repositories/user-repository';
import { Signup } from '../../../src/domain/use-cases/user/signup';
import { Login } from '../../../src/domain/use-cases/user/login';

describe('Artists use case', () => {
  class MockUserRepository implements UserRepository {
    signup(user: Omit<User, '_id' | 'role'>): Promise<boolean> {
      throw new Error('Method not implemented.');
    }
    login(email: string, password: string): Promise<string> {
      throw new Error('Method not implemented.');
    }
  }

  let mockUserRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserRepository = new MockUserRepository();
  });

  test('signup -> should return true', async () => {
    const InputData = {
      email: 'antoine@test.gg',
      hash: 'HelloWorld',
    };
    jest
      .spyOn(mockUserRepository, 'signup')
      .mockImplementation(() => Promise.resolve(true));

    const signupUseCase = new Signup(mockUserRepository);
    const result = await signupUseCase.execute(InputData);
    expect(result).toBe(true);
  });

  test('login -> return token', async () => {
    const ExpectedData = '1234';
    const InputData = {
      email: 'antoine@test.gg',
      hash: 'HelloWorld',
    };

    jest
      .spyOn(mockUserRepository, 'login')
      .mockImplementation(() => Promise.resolve(ExpectedData));

    const loginUseCase = new Login(mockUserRepository);
    const result = await loginUseCase.execute({ ...InputData });
    expect(result).toStrictEqual(ExpectedData);
  });
});
