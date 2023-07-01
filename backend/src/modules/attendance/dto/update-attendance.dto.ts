import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { AttendanceStatus } from '../../../shared/enums/attendance-status.enum';

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
