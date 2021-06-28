import { Injectable } from '@nestjs/common';
import { IGame } from './interface';

@Injectable()
export class GameRepository {
  private users: Map<string, IGame> = new Map();

  public findOne(id: string) {
    return this.users.get(id);
  }

  public find() {
    return this.users;
  }

  public delete(id: string) {
    return this.users.delete(id);
  }
}
