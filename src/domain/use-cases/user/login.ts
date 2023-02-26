import { User } from '../../entities/user';
import { UserRepository } from '../../interfaces/repositories/user-repository';
import { LoginUseCase } from '../../interfaces/use-cases/user/login';

export class Login implements LoginUseCase {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  execute(loginInfo: Pick<User, 'email' | 'hash'>): Promise<string> {
    return this.userRepository.login(loginInfo.email, loginInfo.hash);
  }
}
