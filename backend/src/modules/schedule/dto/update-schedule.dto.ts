import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ScheduleStatus } from '../entities/schedule.entity';

export class UpdateScheduleDto {
  @IsUUID()
  @IsOptional()
  doctorId: string;

  @IsDateString()
  scheduleDate: Date;

  @IsOptional()
  scheduleTime: Date;

  @IsOptional()
  @IsEnum(ScheduleStatus)
  status: ScheduleStatus;
}
