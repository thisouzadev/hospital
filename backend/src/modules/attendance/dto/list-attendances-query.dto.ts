import {
  IsDateString,
  IsOptional,
  IsUUID,
  IsIn,
  IsEnum,
  IsString,
} from 'class-validator';
import { PageOptionsDto } from '../../../shared/dtos/page-options.dto';
import { AttendanceStatus } from '../../../shared/enums/attendance-status.enum';

export class ListAttendanceQueryDto extends PageOptionsDto {
  @IsUUID()
  @IsOptional()
  doctorId?: string;

  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsEnum(AttendanceStatus)
  status?: AttendanceStatus;

  @IsUUID()
  @IsOptional()
  patientId?: string;

  @IsDateString()
  @IsOptional()
  attendanceDate?: string;

  @IsDateString()
  @IsOptional()
  attendanceStartDate?: string;

  @IsDateString()
  @IsOptional()
  attendanceEndDate?: string;

  @IsOptional()
  @IsIn(['attendanceDate', 'createdAt', 'updatedAt', 'confirmedAt', 'status'])
  orderBy?: string = 'status';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  // @ValidateIf((o) => !o.orderBy)
  orderType?: string = 'DESC';
}
