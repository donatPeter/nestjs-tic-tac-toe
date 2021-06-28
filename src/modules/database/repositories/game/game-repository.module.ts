import { ClassProvider, Module } from '@nestjs/common';
import { GameRepository } from './game-repository';

const gameRepositoryProvider: ClassProvider = {
  provide: 'GAME_REPOSITORY',
  useClass: GameRepository,
};

@Module({
  controllers: [],
  providers: [gameRepositoryProvider],
  imports: [],
  exports: [gameRepositoryProvider],
})
export class GameRepositoryModule {}
