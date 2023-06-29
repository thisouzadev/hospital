import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class ListDoctorSchedulesQueryDto {
  @IsUUID()
  @IsOptional()
  doctorId?: string;

  @IsDateString()
  @IsOptional()
  attendanceStartDate?: string;

  @IsDateString()
  @IsOptional()
  attendanceEndDate?: string;

  @IsOptional()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @Max(6)
  weekDay?: number;
}
