import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameBody, GetGameQuery, MakeMoveBody } from './interface';

@Controller()
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get('game/:id')
  public getGame(@Param() { id }: GetGameQuery) {
    return this.service.getGame(id);
  }

  @Post('game')
  public createGame(@Body() { userOneId, userTwoId }: CreateGameBody) {
    return this.service.createGame(userOneId, userTwoId);
  }

  @Delete('game/:id')
  public deleteGame(@Param() { id }: GetGameQuery) {
    return this.service.deleteGame(id);
  }

  @Put('game/:id')
  public makeMove(
    @Param() { id }: GetGameQuery,
    @Body() { userId, position }: MakeMoveBody,
  ) {
    return this.service.makeMove(id, userId, position);
  }
}
