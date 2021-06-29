import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should be able create a user', () => {
      const userId = service.createUser('test@test.com');
      const user = service.getUser(userId);
      expect(userId).toBeDefined();
      expect(user.email).toBe('test@test.com');
    });

    it('should not be able create a user twice with the same email', () => {
      try {
        service.createUser('test@test.com');
        service.createUser('test@test.com');
      } catch (e) {
        expect(e.message).toBe('USER_ALREADY_EXISTS');
      }
    });
  });
});
