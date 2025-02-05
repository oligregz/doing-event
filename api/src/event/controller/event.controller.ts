import { Body, Controller, Post } from '@nestjs/common';
import { EventDTO } from '../dto/EventDTO';

@Controller('event')
export class EventController {
  @Post()
  create(@Body() event: EventDTO) {
    console.log(event);
  }
}
