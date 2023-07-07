import {
  IsDateString,
  IsOptional,
  IsUUID,
  IsIn,
  IsString,
} from 'class-validator';
import { PageOptionsDto } from '../../../shared/dtos/page-options.dto';

export class ListQuickTestsQueryDto extends PageOptionsDto {
  @IsUUID()
  @IsOptional()
  patientId?: string;

  @IsUUID()
  @IsOptional()
  testId?: string;

  @IsUUID()
  @IsOptional()
  responsibleId?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  docNumber?: string;

  @IsString()
  @IsOptional()
  reqUnit?: string;

  @IsOptional()
  @IsIn(['date', 'createdAt'])
  orderBy?: string = 'date';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  orderType?: string = 'DESC';
}
