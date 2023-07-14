import { IState } from '../../address/models/IState';
import { IEmployee } from '../../employee/models/IEmployee';
import { IDoctorSchedule } from './IDoctorSchedule';

export interface IDoctor {
  doctorId: string;

  employeeId: string;

  employee: IEmployee;

  specialty: string;

  crm: string;

  crmStateId: number;

  crmState: IState;

  schedules: IDoctorSchedule[];

  createdAt: Date;

  updatedAt: Date;
}
