import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTestCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
