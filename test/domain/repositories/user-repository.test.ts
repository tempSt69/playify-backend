import { UserDataSource } from '../../../src/data/interfaces/data-sources/entity/user-data-source';
import { UserRepositoryImpl } from '../../../src/domain/repositories/user-repository';

class MockUserDataSource implements UserDataSource {
  findOneFilter(filter: object): Promise<any> {
    throw new Error('Method not implemented.');
  }
  searchIndex?: string | undefined;
  searchIndexText?: string | undefined;
  searchField?: string | undefined;
  getAll(): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
  find(query: object): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  insertOne(doc: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  updateOne(id: string, data: Object): Promise<any> {
    throw new Error('Method not implemented.');
  }
  deleteOne(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  search(searchString: string, field: string): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
}

describe('User repository', () => {
  let mockUserDataSource: MockUserDataSource;
  let userRepository: UserRepositoryImpl;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserDataSource = new MockUserDataSource();
    userRepository = new UserRepositoryImpl(mockUserDataSource);
  });

  describe('signup', () => {
    test('should return true', async () => {
      const inputData = {
        email: 'antoine@test.gg',
        hash: '12345678',
      };

      jest
        .spyOn(mockUserDataSource, 'insertOne')
        .mockImplementation(() => Promise.resolve(true));

      const result = await userRepository.signup({ ...inputData });
      expect(result).toBeTruthy();
    });
  });

  describe('login', () => {
    test('should return token', async () => {
      const inputData = {
        email: 'antoine@test.gg',
        password: '12345678',
      };
      jest
        .spyOn(mockUserDataSource, 'findOneFilter')
        .mockImplementation(() => Promise.resolve(true));

      const result = await userRepository.login(
        inputData.email,
        inputData.password
      );
      expect(typeof result).toBe('string');
    });
  });
});
