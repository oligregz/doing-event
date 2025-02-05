import { Body, Controller, Post } from '@nestjs/common';
import { EventDTO } from '../dto/EventDTO';
import { EventService } from '../event/event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() event: EventDTO) {
    this.eventService.create(event);
  }
}
