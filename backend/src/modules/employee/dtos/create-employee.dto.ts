import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';

import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../address/dto/create-address.dto';

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

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
