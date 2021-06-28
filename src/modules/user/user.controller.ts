import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserBody, GetUserQuery } from './interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  public getUsers() {
    return this.userService.getUsers();
  }

  @Get('user/:id')
  public getUser(@Param() { id }: GetUserQuery) {
    return this.userService.getUser(id);
  }

  @Post('user')
  public createUser(@Body() { email }: CreateUserBody) {
    return this.userService.createUser(email);
  }

  @Delete('user/:id')
  public deleteUser(@Param() { id }: GetUserQuery) {
    return this.userService.deleteUser(id);
  }
}
