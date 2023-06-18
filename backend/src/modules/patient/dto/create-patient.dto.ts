import { IsDateString, IsString } from 'class-validator';
import { ICreatePatient } from '../../../shared/interfaces/create-patient.interface';
import { Race } from '../entities/patient.entity';

export class CreatePatientDto implements ICreatePatient {
  @IsString()
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

  @IsString()
  gender: string;

  @IsString()
  cns: string;

  @IsString()
  race: Race;

  @IsString()
  maritalState: string;

  @IsString()
  placeOfBirth: string;
}
