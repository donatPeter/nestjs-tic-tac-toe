import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { GetGameQuery } from './interface';

@Controller()
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get('game/:id')
  public getGame(@Param() { id }: GetGameQuery) {
    return this.service.getGame(id);
  }
}
