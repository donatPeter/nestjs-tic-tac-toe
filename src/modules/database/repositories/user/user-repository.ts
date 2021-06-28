import { Injectable } from '@nestjs/common';
import { IUser } from './interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
  private users: Map<string, IUser> = new Map();

  public findOne(id: string) {
    return this.users.get(id);
  }

  public find() {
    return this.users;
  }

  public delete(id: string) {
    return this.users.delete(id);
  }

  public save(email: string) {
    return this.users.set(uuidv4(), { email });
  }
}
