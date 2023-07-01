import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class UpdateAttendanceDto {
  @IsUUID()
  @IsOptional()
  doctorId: string;

  @IsDateString()
  attendanceDate: string;

  @IsOptional()
  attendanceTime: string;
}
