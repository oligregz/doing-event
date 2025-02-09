import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventDTO } from '../dto/EventDTO';
import { EventService } from '../service/event.service';
import { UpdatedEventDTO } from '../dto/UpdatedEventDTO';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() event: EventDTO) {
    return await this.eventService.create(event);
  }

  // @Get()
  // async list() {
  //   console.log(await this.eventService.list());
  // }

  // @Get('/:id')
  // async findById(@Param('id') id: string) {
  //   await this.eventService.findById(id);
  // }

  // @Put()
  // async update(@Body() updatedEventBody: UpdatedEventDTO) {
  //   console.log(await this.eventService.update(updatedEventBody));
  // }

  // @Delete('/:id')
  // async deleteById(@Param('id') id: string) {
  //   await this.eventService.delete(id);
  // }
}
