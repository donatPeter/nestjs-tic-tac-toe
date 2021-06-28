import { Module } from '@nestjs/common';
import { GameModule } from './modules/game/game.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [GameModule, DatabaseModule, UserModule],
})
export class AppModule {}
