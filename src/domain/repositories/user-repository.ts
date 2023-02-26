import { UserDataSource } from '../../data/interfaces/data-sources/entity/user-data-source';
import { User } from '../entities/user';
import { UserRepository } from '../interfaces/repositories/user-repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserRepositoryImpl implements UserRepository {
  userDataSource: UserDataSource;

  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource;
  }

  async signup(user: Omit<User, '_id' | 'role'>): Promise<boolean> {
    const hash = await bcrypt.hash(user.hash, 10);
    const result = await this.userDataSource.insertOne({
      ...user,
      hash: hash,
      role: 'User',
    });
    return result;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userDataSource.findOneFilter({ email: email });
    if (user) {
      const result = await bcrypt.compare(password, user.hash);
      if (result) {
        const token = await jwt.sign(
          { email: user.email, role: user.role },
          process.env.JWT_SECRET!,
          {
            expiresIn: '1h',
          }
        );

        return token;
      } else {
        throw new Error('Bad password');
      }
    } else {
      throw new Error(`No user found for ${email}`);
    }
  }
}
