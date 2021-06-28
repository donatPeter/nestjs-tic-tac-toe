import { ClassProvider, Module } from '@nestjs/common';
import { UserRepository } from './user-repository';

const userRepositoryProvider: ClassProvider = {
  provide: 'USER_REPOSITORY',
  useClass: UserRepository,
};

@Module({
  controllers: [],
  providers: [userRepositoryProvider],
  imports: [],
  exports: [userRepositoryProvider],
})
export class UserRepositoryModule {}
