import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EventDTO {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(8)
  @MaxLength(256)
  description: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
