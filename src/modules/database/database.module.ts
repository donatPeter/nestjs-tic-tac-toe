import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

// in-memory DB, represent a persisted DB (like MongoDB)
@Module({
  providers: [DatabaseService],
})
export class DatabaseModule {}
