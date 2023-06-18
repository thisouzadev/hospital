import { Race } from '../../modules/patient/entities/patient.entity';

export interface ICreatePatient {
  name: string;

  cpf: string;

  rg: string;

  birth: Date;

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
