import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { Type } from 'class-transformer';

export class CreateHospitalDto {
  @IsNotEmpty({ message: 'O nome da unidade não pode estar vazio' })
  hospitalName: string;

  @IsNotEmpty({ message: 'O nome do diretor não pode estar vazio' })
  director: string;

  @Type(() => CreateAddressDto)
  @ValidateNested()
  address: CreateAddressDto;
}
