import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventDTO } from '../dto/EventDTO';
import { EventService } from '../service/event.service';
import { UpdatedEventDTO } from '../dto/UpdatedEventDTO';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() event: EventDTO) {
    this.eventService.create(event);
  }

  @Get()
  list() {
    console.log(this.eventService.list());
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    this.eventService.findById(id);
  }

  @Put()
  update(@Body() updatedEventBody: UpdatedEventDTO) {
    console.log(this.eventService.update(updatedEventBody));
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    this.eventService.delete(id);
  }
}
