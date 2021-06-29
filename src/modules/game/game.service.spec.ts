import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { DatabaseModule } from '../database/database.module';

describe('GameService', () => {
  let service: GameService;
  let userRepository;

  beforeEach(async () => {
    userRepository = {
      provide: 'USER_REPOSITORY',
      useValue: {
        findOne: jest.fn<any, []>(() => ({})),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [GameService, userRepository],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('makeMove', () => {
    it('should throw an error in case of a non-existing game id', () => {
      try {
        service.makeMove('not_an_id', 'user1', 1);
      } catch (e) {
        expect(e.message).toBe('GAME_NOT_FOUND');
      }
    });

    it('should throw an error in case of a non-exising user', () => {
      try {
        jest
          .spyOn(userRepository.useValue, 'findOne')
          .mockImplementationOnce(() => ({ email: 'test@test.com' }));
        const gameId = service.createGame('user1', 'user2');
        service.makeMove(gameId, 'user3', 1);
      } catch (e) {
        expect(e.message).toBe('INVALID_PLAYER');
      }
    });

    it('should throw an error in case of user2 wants to start', () => {
      try {
        jest
          .spyOn(userRepository.useValue, 'findOne')
          .mockImplementationOnce(() => ({ email: 'test@test.com' }));
        const gameId = service.createGame('user1', 'user2');
        service.makeMove(gameId, 'user2', 1);
      } catch (e) {
        expect(e.message).toBe('USER_ONE_SHOULD_START');
      }
    });

    it('should throw an error in case of intended position is already taken', () => {
      try {
        jest
          .spyOn(userRepository.useValue, 'findOne')
          .mockImplementationOnce(() => ({ email: 'test@test.com' }));
        const gameId = service.createGame('user1', 'user2');
        service.makeMove(gameId, 'user1', 1);
        service.makeMove(gameId, 'user2', 1);
      } catch (e) {
        expect(e.message).toBe('POSITION_ALREADY_TAKEN');
      }
    });

    it('should throw an error in case of a user wants to move twice', () => {
      try {
        jest
          .spyOn(userRepository.useValue, 'findOne')
          .mockImplementationOnce(() => ({ email: 'test@test.com' }));
        const gameId = service.createGame('user1', 'user2');
        service.makeMove(gameId, 'user1', 1);
        service.makeMove(gameId, 'user1', 1);
      } catch (e) {
        expect(e.message).toBe('ITS_NOT_YOUR_TURN');
      }
    });
  });
});
