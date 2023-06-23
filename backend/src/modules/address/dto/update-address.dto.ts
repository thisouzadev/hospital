import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  addressId: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsOptional()
  streetNumber: string;

  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Informe o município' })
  cityId: number;

  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Informe o Estado' })
  stateId: number;

  @IsString()
  district: string;

  @IsString()
  cep: string;
}
