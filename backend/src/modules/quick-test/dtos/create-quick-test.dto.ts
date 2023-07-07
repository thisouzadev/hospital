import { IsDateString, IsEnum, IsString, IsUUID } from 'class-validator';
import { TestResultType } from '../../../shared/enums/test-result.enum';

export class CreateQuickTestDto {
  @IsUUID()
  testId: string;

  @IsUUID()
  patientId: string;

  @IsUUID()
  attendanceId: string;

  @IsDateString()
  date: string;

  @IsEnum(TestResultType)
  result: TestResultType;

  @IsString()
  docNumber: string;

  @IsString()
  reqUnit: string;
}
