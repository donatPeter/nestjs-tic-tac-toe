import { Inject, Injectable } from '@nestjs/common';
import { GameRepository } from '../database/repositories/game/game-repository';

@Injectable()
export class GameService {
  constructor(
    @Inject('GAME_REPOSITORY')
    private readonly gameRepository: GameRepository,
  ) {}

  public getGame(id: string) {
    return this.gameRepository.findOne(id);
  }
}
