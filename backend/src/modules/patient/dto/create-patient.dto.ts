import { DiscriminatorDescriptor, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { Gender } from 'src/shared/enums/gender.enum';
import { MaritalState } from 'src/shared/enums/marital-states.enum';
import { Race } from 'src/shared/enums/race.enum';
import { ICreatePatientDTO } from '../../../shared/interfaces/create-patient.interface';

export class CreatePatientDto implements ICreatePatientDTO {
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

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
