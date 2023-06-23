import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class ListAttendanceQueryDto {
  @IsUUID()
  @IsOptional()
  doctorId?: string;

  @IsUUID()
  @IsOptional()
  patientId?: string;

  @IsDateString()
  @IsOptional()
  attendanceDate?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  perPage = 10;
}
