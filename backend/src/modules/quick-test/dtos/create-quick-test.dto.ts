import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateTestResultDto } from './create-test-result.dto';

export class CreateQuickTestDto {
  @IsUUID()
  testCategoryId: string;

  @IsUUID()
  patientId: string;

  @IsUUID()
  attendanceId: string;

  @IsDateString()
  date: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateTestResultDto)
  results: CreateTestResultDto[];

  @IsString()
  docNumber: string;

  @IsString()
  reqUnit: string;
}
