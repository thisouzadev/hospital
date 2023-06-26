import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../address/dto/create-address.dto';

import { CreateDoctorDto } from '../../doctor/dto/create-doctor.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class UpdateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsString()
  cpf: string;

  @IsString()
  rg: string;

  @IsString()
  cns: string;

  @IsString()
  mat: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateDoctorDto)
  doctor: CreateDoctorDto;
}
