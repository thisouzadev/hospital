import { IsDate, IsDateString, IsString } from 'class-validator';
import { Race } from '../entities/patient.entity';

export class CreatePatientDto {
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
