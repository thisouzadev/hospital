import {
  IsDateString,
  IsOptional,
  IsUUID,
  IsIn,
  IsEnum,
} from 'class-validator';
import { PageOptionsDto } from 'src/shared/dtos/page-options.dto';
import { AttendanceStatus } from '../../../shared/enums/attendance-status.enum';

export class ListAttendanceQueryDto extends PageOptionsDto {
  @IsUUID()
  @IsOptional()
  doctorId?: string;

  @IsOptional()
  @IsEnum(AttendanceStatus)
  status?: AttendanceStatus;

  @IsUUID()
  @IsOptional()
  patientId?: string;

  @IsDateString()
  @IsOptional()
  attendanceDate?: string;

  @IsOptional()
  @IsIn(['attendanceDate', 'createdAt'])
  orderBy?: string = 'createdAt';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  // @ValidateIf((o) => !o.orderBy)
  orderType?: string = 'DESC';
}
