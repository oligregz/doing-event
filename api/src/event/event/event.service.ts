import { Injectable } from '@nestjs/common';
import { EventDTO } from '../dto/EventDTO';

@Injectable()
export class EventService {
  private events: EventDTO[] = [];

  create(event: EventDTO) {
    this.events.push(event);
    console.log(this.events);
  }
}
