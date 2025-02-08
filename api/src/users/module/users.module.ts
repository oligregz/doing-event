import { Module } from '@nestjs/common';
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
