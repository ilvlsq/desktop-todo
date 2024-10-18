import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Post()
  async createUser(@Body('username') username: string) {
    return this.usersService.createUser(username);
  }
}
