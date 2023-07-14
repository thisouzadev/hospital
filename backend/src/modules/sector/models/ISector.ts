import { IAttendance } from '../../attendance/models/IAttendance';
import { IHospital } from '../../hospital/models/IHospital';
import { ISectorAttendance } from './ISectorAttendance';

export interface ISector {
  sectorId: string;

  name: string;

  description: string;

  attendances: IAttendance[];

  hospitalId: string;

  sectorAttendances: ISectorAttendance[];

  hospital: IHospital;

  updatedAt: Date;

  createdAt: Date;
}
