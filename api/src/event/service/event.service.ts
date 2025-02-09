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
    // checks if the object already exists
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

    // checks if the time slot is available
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

  async existsObject(event: EventDTO): Promise<boolean> {
    const uniqueFields = ['id', 'description', 'startDate', 'endDate'];

    const whereConditions: Record<string, any> = {};
  
    // create dinamic WHERE
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

  async isTimeRangeAvailable(startDate: Date, endDate: Date): Promise<boolean> {
    const overlappingEvent = await this.eventRepository.findOne({
      where: [
        // case1: the new event has exactly the same timeRange as another event
        {
          startDate: startDate,
          endDate: endDate,
        },
        // case2: the new event starts or ends inside another event
        {
          startDate: Between(startDate, endDate),
        },
        {
          endDate: Between(startDate, endDate),
        },
        // case3: the new event starts or ends inside another event
        {
          startDate: LessThanOrEqual(startDate),
          endDate: MoreThanOrEqual(endDate),
        },
      ],
    });

    return !overlappingEvent;
  }
}

