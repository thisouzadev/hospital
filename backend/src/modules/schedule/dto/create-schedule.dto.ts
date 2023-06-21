import { IsDateString, IsOptional, IsUUID } from 'class-validator';
import { ICreateScheduleDto } from 'src/shared/interfaces/create-schedule.interface';

export class CreateScheduleDto implements ICreateScheduleDto {
  @IsUUID()
  @IsOptional()
  doctorId: string;

  @IsUUID()
  patientId: string;

  @IsDateString()
  scheduleDate: Date;

  @IsOptional()
  scheduleTime: Date;

  @IsOptional()
  orderNumber: number;
}
