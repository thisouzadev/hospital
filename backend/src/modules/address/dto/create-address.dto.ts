import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
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
