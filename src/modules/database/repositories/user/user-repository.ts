import { BadRequestException, Injectable } from '@nestjs/common';
import { IUser } from './interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
  private users: Map<string, IUser> = new Map();

  public findOne(id: string) {
    return this.users.get(id);
  }

  public find() {
    return Array.from(this.users).map(([id, user]) => ({ id, user }));
  }

  public delete(id: string) {
    this.users.delete(id);
    return;
  }

  /**
   * Save user and return with the newly created user's id
   * @param email
   */
  public save(email: string) {
    const id = uuidv4();
    this.users.forEach((user) => {
      if (user.email === email)
        throw new BadRequestException('USER_ALREADY_EXISTS');
    });
    this.users.set(id, { email });
    return id;
  }
}
