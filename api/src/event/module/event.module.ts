import { Module } from '@nestjs/common';
import { EventController } from '../controller/event.controller';
import { EventService } from '../service/event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/db/entities/event.entity';

@Module({
  controllers: [EventController],
  exports: [EventService],
  providers: [EventService],
  imports: [TypeOrmModule.forFeature([EventEntity])],
})
export class EventModule {}
