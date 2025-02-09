import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/module/event.module';
import { UsersModule } from './users/module/users.module';
import { AuthModule } from './auth/module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/module/db.module';

@Module({
  imports: [
    EventModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
