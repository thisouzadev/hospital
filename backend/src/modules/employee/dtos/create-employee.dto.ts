import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';

import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../address/dto/create-address.dto';
import { CreateDoctorDto } from 'src/modules/doctor/dto/create-doctor.dto';

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

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateDoctorDto)
  doctor: CreateDoctorDto;
}
