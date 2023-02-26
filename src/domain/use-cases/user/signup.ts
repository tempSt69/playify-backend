import { User } from '../../entities/user';
import { UserRepository } from '../../interfaces/repositories/user-repository';
import { SignupUseCase } from '../../interfaces/use-cases/user/signup';

export class Signup implements SignupUseCase {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  execute(user: Omit<User, 'role' | '_id'>): Promise<boolean> {
    return this.userRepository.signup(user);
  }
}
