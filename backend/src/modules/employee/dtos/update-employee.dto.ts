import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { UpdateAddressDto } from 'src/modules/address/dto/update-address.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';

export class UpdateEmployeeDto {
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
  @Type(() => UpdateUserDto)
  user: UpdateUserDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;
}
