import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateScheduleDto {
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
