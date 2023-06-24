import { MaritalState } from '../../enums/marital-states.enum';
import { Race } from '../../enums/race.enum';

export interface IPatient {
  patientId: string;

  name: string;

  birth: string;

  cpf: string;

  rg: string;

  responsible: string;

  cns: string;

  mother: string;

  father: string;

  occupation: string;

  gender: string;

  race: Race;

  maritalState: MaritalState;

  placeOfBirth: string;

  createdAt: Date;

  updatedAt: Date;
}
