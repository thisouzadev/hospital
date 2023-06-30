import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class SearchPatientQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  cns?: string;

  @IsOptional()
  @IsDateString()
  attendanceDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  attendanceNumber?: number;
}
