import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TestResultType } from '../../../shared/enums/test-result.enum';

export class CreateTestResultDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(TestResultType)
  result: TestResultType;
}
