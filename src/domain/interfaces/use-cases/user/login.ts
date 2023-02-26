import { User } from '../../../entities/user';

export interface LoginUseCase {
  execute(loginInfo: Pick<User, 'email' | 'hash'>): Promise<string>;
}
