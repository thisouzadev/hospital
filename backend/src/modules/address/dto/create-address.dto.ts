import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsString()
  streetNumber: string;

  @IsNumber()
  cityId: number;

  @IsNumber()
  stateId: number;

  @IsString()
  district: string;

  @IsString()
  cep: string;
}
