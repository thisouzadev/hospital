import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTestCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isMultiple: boolean;

  @IsNotEmpty()
  @IsString()
  testList: string;
}
