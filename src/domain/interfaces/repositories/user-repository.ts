import { User } from '../../entities/user';
export interface UserRepository {
  signup(user: Omit<User, '_id' | 'role'>): Promise<boolean>;
  login(email: string, password: string): Promise<string>;
}
