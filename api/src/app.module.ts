import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/module/event.module';
import { UsersModule } from './users/module/users.module';

@Module({
  imports: [EventModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
