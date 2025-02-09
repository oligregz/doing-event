import { IsDateString, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdatedEventDTO {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
