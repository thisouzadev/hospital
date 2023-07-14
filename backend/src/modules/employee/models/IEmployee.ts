import { IHospital } from '../../hospital/models/IHospital';
import { IAddress } from '../../address/models/IAddress';
import { IUser } from '../../user/models/IUser';
import { IDoctor } from '../../doctor/models/IDoctor';

export interface IEmployee {
  employeeId: string;

  name: string;

  cpf: string;

  rg: string;

  mat: string;

  cns: string;

  active: boolean;

  hospitalId: string;

  createdAt: Date;

  updatedAt: Date;

  leftAt: Date;

  hospital: IHospital;

  doctor?: IDoctor;

  user: IUser;

  address: IAddress;
}
