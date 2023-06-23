import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { AttendanceStatus } from '../entities/attendance.entity';

export class UpdateAttendanceDto {
  @IsUUID()
  @IsOptional()
  doctorId: string;

  @IsDateString()
  attendanceDate: Date;

  @IsOptional()
  attendanceTime: Date;

  @IsOptional()
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}
