import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { EventEntity } from "./entities/event.entity";
import { UserEntity } from "./entities/user.entity";

config();

const configService = new ConfigService();
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.getOrThrow<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [EventEntity, UserEntity],
  migrations: [__dirname + '/migrations/*.ts'],
};

export default new DataSource(dataSourceOptions);