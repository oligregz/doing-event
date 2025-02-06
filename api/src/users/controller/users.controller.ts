import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserDTO } from '../dto/UserDTO';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() user: UserDTO) {
    console.log(this.userService.create(user));
  }
}
