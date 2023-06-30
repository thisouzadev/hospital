import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateAttendanceDto {
  @IsUUID()
  doctorId?: string;

  @IsUUID()
  doctorScheduleId: string;

  @IsUUID()
  patientId: string;

  @IsDateString()
  attendanceDate: string;

  @IsOptional()
  attendanceTime?: string;

  @IsOptional()
  orderNumber?: number;
}
