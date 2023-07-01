import { IsEnum } from 'class-validator';
import { AttendanceStatus } from '../../../shared/enums/attendance-status.enum';

export class UpdateAttendanceStatusDto {
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}
