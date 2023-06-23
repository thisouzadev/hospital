import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { UpdateAddressDto } from '../../../modules/address/dto/update-address.dto';
import { CreateAddressDto } from '../../../modules/address/dto/create-address.dto';
import { Gender } from '../../../shared/enums/gender.enum';
import { MaritalState } from '../../../shared/enums/marital-states.enum';
import { Race } from '../../../shared/enums/race.enum';

export class UpdatePatientDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  name: string;

  @IsString()
  @Length(11, 11, { message: 'CPF inválido' })
  cpf: string;

  @IsString()
  rg: string;

  @IsDateString({ strict: true }, { message: 'Data de nascimento inválida' })
  birth: Date;

  @IsString()
  responsible: string;

  @IsString()
  mother: string;

  @IsString()
  father: string;

  @IsString()
  occupation: string;

  @IsString()
  phone: string;

  @IsEnum(Gender, { message: 'Sexo inválido' })
  gender: Gender;

  @IsString()
  cns: string;

  @IsEnum(Race, { message: 'Raça/cor inválido' })
  race: Race;

  @IsEnum(MaritalState, { message: 'Estado civil inválido' })
  maritalState: MaritalState;

  @IsString()
  placeOfBirth: string;

  @Type(() => UpdateAddressDto)
  @ValidateNested()
  address: UpdateAddressDto;
}
