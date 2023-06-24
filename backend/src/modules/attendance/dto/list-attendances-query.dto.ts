import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsUUID,
  IsIn,
  IsEnum,
  IsNumber,
  isIn,
  ValidateIf,
} from 'class-validator';

enum ValidOrderBy {
  attendanceDate,
  createdAt,
}

export class ListAttendanceQueryDto {
  @IsUUID()
  @IsOptional()
  doctorId?: string;

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

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  perPage = 10;
}
