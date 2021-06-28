import { Injectable } from '@nestjs/common';
import { IGame } from './interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameRepository {
  private games: Map<string, IGame> = new Map();

  public findOne(id: string) {
    return this.games.get(id);
  }

  public delete(id: string) {
    this.games.delete(id);
    return;
  }

  public save(userOneId: string, userTwoId: string) {
    const id = uuidv4();
    this.games.set(id, { moves: [], userOneId, userTwoId });
    return id;
  }
}
