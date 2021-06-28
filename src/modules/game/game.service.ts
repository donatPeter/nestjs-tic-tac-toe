import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GameRepository } from '../database/repositories/game/game-repository';
import { UserRepository } from '../database/repositories/user/user-repository';
import { IGame } from '../database/repositories/game/interface';

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

  /**
   * Make a move in an ongoing game. return with the status of the game
   * @param gameId
   * @param userId
   * @param position
   */
  public makeMove(gameId: string, userId: string, position: number) {
    const game = this.gameRepository.findOne(gameId);
    GameService.validateMove(game, userId);

    // make the intended move
    this.gameRepository.update(gameId, { userId, position });

    // one of the players win
    if (this.checkWinner(game, userId)) {
      return this.gameRepository.updateStatus(
        gameId,
        userId === game.userOneId ? 'USER_ONE_WINS' : 'USER_TWO_WINS',
      );
      // there is no empty position left
    } else if (game.moves.length === 8) {
      return this.gameRepository.updateStatus(gameId, 'DRAW');
    } else {
      return game;
    }
  }

  /**
   * Validate if the intended move is doable
   * @param game
   * @param userId
   * @private
   */
  private static validateMove(game: IGame, userId: string) {
    // if the game is not found throw an exception
    if (!game) {
      throw new NotFoundException();
    }
    // if the userId in the request is not one of the registered users on the game
    if (game.userOneId !== userId || game.userTwoId !== userId) {
      throw new BadRequestException();
    }
    // if not userOne would start
    if (!game.moves.length && game.userOneId !== userId) {
      throw new BadRequestException('USER_ONE_SHOULD_START');
    }
    // if the game is already over
    if (game.status !== 'IN_GAME') {
      throw new BadRequestException('GAME_IS_ALREADY_OVER');
    }
    // if the last move was make by the same player
    if (
      game.moves.length &&
      game.moves[game.moves.length - 1].userId === userId
    ) {
      throw new BadRequestException('ITS_NOT_YOUR_TURN');
    }
  }

  /**
   * Check if
   * @param game
   * @param userId
   * @private
   */
  private checkWinner(game: IGame, userId: string): boolean {
    const winningStatuses = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    const userMoves = game.moves
      .filter((move) => move.userId === userId)
      .map(({ position }) => position);
    return (
      userMoves.length >= 3 &&
      winningStatuses.some((winningStatus) =>
        winningStatus.every((winningPosition) =>
          userMoves.includes(winningPosition),
        ),
      )
    );
  }
}
