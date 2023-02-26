import { User } from '../../../entities/user';

export interface SignupUseCase {
  execute(user: Omit<User, 'role' | '_id'>): Promise<boolean>;
}
