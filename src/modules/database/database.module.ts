import { Module } from '@nestjs/common';
import { UserRepositoryModule } from './repositories/user/user-repository.module';
import { GameRepositoryModule } from './repositories/game/game-repository.module';

// in-memory DB, represent a persisted DB (like MongoDB)
@Module({
  imports: [UserRepositoryModule, GameRepositoryModule],
  providers: [],
  exports: [UserRepositoryModule, GameRepositoryModule],
})
export class DatabaseModule {}
