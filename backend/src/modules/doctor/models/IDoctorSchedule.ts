import { IAttendance } from '../../attendance/models/IAttendance';
import { IHospital } from '../../hospital/models/IHospital';
import { IDoctor } from './IDoctor';

export interface IDoctorSchedule {
  scheduleId: string;

  doctorId: string;

  doctor: IDoctor;

  hospitalId: string;

  hospital: IHospital;

  weekDay: number;

  startAt: string;

  endAt: string;

  vacancies: number;

  attendances: IAttendance[];

  createdAt: Date;

  updatedAt: Date;
}
