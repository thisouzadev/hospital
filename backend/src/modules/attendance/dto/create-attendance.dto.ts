import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateAttendanceDto {
  @IsUUID()
  @IsOptional()
  doctorId: string;

  @IsUUID()
  patientId: string;

  @IsDateString()
  attendanceDate: Date;

  @IsOptional()
  attendanceTime: Date;

  @IsOptional()
  orderNumber: number;
}
