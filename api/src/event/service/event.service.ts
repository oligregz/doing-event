import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventDTO } from '../dto/EventDTO';
import { UpdatedEventDTO } from '../dto/UpdatedEventDTO';
import { v4 as getUUID } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/db/entities/event.entity';
import { Between, LessThanOrEqual, Not, Repository, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>
  ) {}

  async create(event: EventDTO): Promise<EventDTO> {
    const eventExists = await this.existsObject(event);

    if (eventExists) {
      throw new HttpException(
        {
          message: `This event already exists`,
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT
      );
    }

    const isTimeRangeAvailable = await this.isTimeRangeAvailable(
      event.startDate,
      event.endDate
    );

    if (!isTimeRangeAvailable) {
      throw new HttpException(
        {
          message: `The time range conflicts with another event`,
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT
      );
    }

    const newEvent = new EventEntity();

    newEvent.id = getUUID();
    newEvent.description = event.description;
    newEvent.startDate = event.startDate;
    newEvent.endDate = event.endDate;

    const savedEvent = await this.eventRepository.save(newEvent);

    return savedEvent;
  }

  async list(): Promise<EventDTO[]> {
    return await this.eventRepository.find();
  }

  async findById(id: string): Promise<EventDTO> {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      throw new HttpException(
        {
          message: `Event with ID ${id} not found`,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND
      );
    }

    return event;
  }

  async update(updatedEventBody: UpdatedEventDTO): Promise<EventDTO> {
    const event = await this.eventRepository.findOne({
      where: { id: updatedEventBody.id },
    });

    if (!event) {
      throw new HttpException(
        {
          message: `Event with ID ${updatedEventBody.id} not found`,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND
      );
    }

    const eventBodyKeys: string[] = ['description', 'startDate', 'endDate'];
    for (let key of eventBodyKeys) {
      if (updatedEventBody[key] !== undefined) {
        event[key] = updatedEventBody[key];
      }
    }

    const isTimeRangeAvailable = await this.isTimeRangeAvailable(
      event.startDate,
      event.endDate,
      event.id
    );

    if (!isTimeRangeAvailable) {
      throw new HttpException(
        {
          message: `The updated time range conflicts with another event`,
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT
      );
    }

    const updatedEvent = await this.eventRepository.save(event);

    return updatedEvent;
  }

  async delete(id: string): Promise<void> {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      throw new HttpException(
        {
          message: `Event with ID ${id} not found`,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND
      );
    }

    await this.eventRepository.remove(event);
  }

  async existsObject(event: EventDTO): Promise<boolean> {
    const uniqueFields = ['id', 'description', 'startDate', 'endDate'];
    const whereConditions: Record<string, any> = {};
  
    for (const field of uniqueFields) {
      if (event[field] !== undefined) {
        whereConditions[field] = event[field];
      }
    }
  
    const eventExists = await this.eventRepository.findOne({
      where: whereConditions,
    });
  
    return !!eventExists;
  }

  async isTimeRangeAvailable(startDate: Date, endDate: Date, eventId?: string): Promise<boolean> {
    const whereConditions = [
      { startDate: startDate, endDate: endDate },
      { startDate: Between(startDate, endDate) },
      { endDate: Between(startDate, endDate) },
      { startDate: LessThanOrEqual(startDate), endDate: MoreThanOrEqual(endDate) },
    ];
  
    const overlappingEvent = await this.eventRepository.findOne({
      where: eventId
        ? whereConditions.map(condition => ({ ...condition, id: Not(eventId) }))
        : whereConditions,
    });
  
    return !overlappingEvent;
  }
  
}
