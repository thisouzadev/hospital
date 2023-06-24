import { Allow, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateAttendanceDto {
  @IsOptional()
  @IsUUID()
  doctorId?: string;

  @IsUUID()
  patientId: string;

  @IsDateString()
  attendanceDate: string;

  @IsOptional()
  attendanceTime?: string;

  @IsOptional()
  orderNumber: number;
}
