import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async (configService: ConfigService, param) => ({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: +configService.getOrThrow<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [__dirname + '/enities/**'],
      migrations: [__dirname + '/migrations/*.ts'],
      synchronize: false
    }),
    inject: [ConfigService]
  })]
})
export class DbModule {}
