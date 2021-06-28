import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user/user-repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}

  public getUser(id: string) {
    return this.userRepository.findOne(id);
  }

  public getUsers() {
    return this.userRepository.find();
  }

  public deleteUser(id: string) {
    return this.userRepository.delete(id);
  }

  public createUser(email: string) {
    return this.userRepository.save(email);
  }
}
