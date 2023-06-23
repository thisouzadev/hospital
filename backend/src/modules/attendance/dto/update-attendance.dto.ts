import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { AttendanceStatus } from '../entities/attendance.entity';

export class UpdateAttendanceDto {
  @IsUUID()
  @IsOptional()
  doctorId: string;

  @IsDateString()
  attendanceDate: string;

  @IsOptional()
  attendanceTime: string;

  @IsOptional()
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}
