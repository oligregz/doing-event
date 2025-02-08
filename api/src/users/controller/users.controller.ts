import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserDTO } from '../dto/UserDTO';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: UserDTO) {
    const createdUser = await this.userService.create(user)
    return createdUser;
  }
}
