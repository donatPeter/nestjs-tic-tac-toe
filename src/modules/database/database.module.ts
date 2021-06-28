import { Module } from '@nestjs/common';
import { UserRepositoryModule } from './repositories/user/user-repository.module';

// in-memory DB, represent a persisted DB (like MongoDB)
@Module({
  imports: [UserRepositoryModule],
  providers: [],
  exports: [UserRepositoryModule],
})
export class DatabaseModule {}
