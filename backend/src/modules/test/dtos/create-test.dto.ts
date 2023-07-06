import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
