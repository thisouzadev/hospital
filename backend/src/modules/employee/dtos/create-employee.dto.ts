import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsUUID()
  hospitalId: string;

  @IsString()
  cpf: string;

  @IsString()
  rg: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
