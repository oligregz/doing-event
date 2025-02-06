import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventDTO } from '../dto/EventDTO';
import { UpdatedEventDTO } from '../dto/UpdatedEventDTO';

@Injectable()
export class EventService {
  private events: EventDTO[] = [];

  checksIfObjectAlreadyExists(event: EventDTO) {
    // search object with its characteristics
    const existsEvent = false;

    if (existsEvent)
      throw new HttpException(`This event already exists`, HttpStatus.CONFLICT);

    return false;
  }

  create(event: EventDTO) {
    // checks if object already exists
    this.checksIfObjectAlreadyExists(event);

    // create object
    this.events.push(event);
    console.log(this.events);
  }

  list() {
    // search events
    const events = this.events;

    if (!events)
      throw new HttpException(`Events not found`, HttpStatus.NOT_FOUND);

    return this.events;
  }

  findById(id: string) {
    const event = true;

    if (!event)
      throw new HttpException(`Event not found`, HttpStatus.NOT_FOUND);

    console.log(event, 'id -', id);

    return event;
  }

  update(newEvent: UpdatedEventDTO) {
    // search event with findById
    this.findById(newEvent.id);
    // after update
    //...

    return newEvent;
  }

  delete(id: string) {
    // search event with findById
    this.findById(id);
    // after update
    console.log('deleted', id);
  }
}
