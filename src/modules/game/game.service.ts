import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GameRepository } from '../database/repositories/game/game-repository';
import { UserRepository } from '../database/repositories/user/user-repository';

@Injectable()
export class GameService {
  constructor(
    @Inject('GAME_REPOSITORY')
    private readonly gameRepository: GameRepository,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}

  public getGame(id: string) {
    return this.gameRepository.findOne(id);
  }

  public deleteGame(id: string) {
    return this.gameRepository.delete(id);
  }

  public createGame(userOneId: string, userTwoId: string) {
    // check if the users exist
    if (
      !this.userRepository.findOne(userOneId) ||
      !this.userRepository.findOne(userTwoId)
    ) {
      throw new BadRequestException('UNKNOWN_USER');
    }
    return this.gameRepository.save(userOneId, userTwoId);
  }
}
