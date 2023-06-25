import { Race } from '../enums/race.enum';

export interface ICreatePatientDTO {
  name: string;

  cpf: string;

  rg: string;

  birth: string;

  responsible: string;

  mother: string;

  father: string;

  occupation: string;

  gender: string;

  cns: string;

  race: Race;

  maritalState: string;

  placeOfBirth: string;
}
