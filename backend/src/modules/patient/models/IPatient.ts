import { IAddress } from '../../address/models/IAddress';
import { IAttendance } from '../../attendance/models/IAttendance';
import { IQuickTest } from '../../quick-test/models/IQuickTest';
import { Gender } from '../../../shared/enums/gender.enum';
import { MaritalState } from '../../../shared/enums/marital-states.enum';
import { Race } from '../../../shared/enums/race.enum';

export interface IPatient {
  patientId: string;

  name: string;

  nameSocial: string;

  birth: string;

  cpf: string;

  rg: string;

  responsible: string;

  cns: string;

  mother: string;

  father: string;

  occupation: string;

  gender: Gender;

  phone: string;

  race: Race;

  maritalState: MaritalState;

  placeOfBirth: string;

  address: IAddress;

  attendances: IAttendance[];

  quickTests: IQuickTest[];

  createdAt: Date;

  updatedAt: Date;
}
