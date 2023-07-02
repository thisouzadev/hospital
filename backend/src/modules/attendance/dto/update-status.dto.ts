import { IsEnum, IsOptional } from 'class-validator';
import { AttendanceType } from '../../../shared/enums/attendance-type-enum';
import { AttendanceStatus } from '../../../shared/enums/attendance-status.enum';

export class UpdateAttendanceStatusDto {
  @IsOptional()
  @IsEnum(AttendanceStatus)
  status?: AttendanceStatus;

  @IsOptional()
  @IsEnum(AttendanceType)
  type?: AttendanceType;
}
