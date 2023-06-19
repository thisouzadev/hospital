import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from 'src/shared/enums/gender.enum';
import { MaritalState } from 'src/shared/enums/marital-states.enum';
import { Race } from 'src/shared/enums/race.enum';
import { ICreatePatient } from '../../../shared/interfaces/create-patient.interface';

export class CreatePatientDto implements ICreatePatient {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  cpf: string;

  @IsString()
  rg: string;

  @IsDateString()
  birth: Date;

  @IsString()
  responsible: string;

  @IsString()
  mother: string;

  @IsString()
  father: string;

  @IsString()
  occupation: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  cns: string;

  @IsEnum(Race)
  race: Race;

  @IsEnum(MaritalState)
  maritalState: MaritalState;

  @IsString()
  placeOfBirth: string;
}
