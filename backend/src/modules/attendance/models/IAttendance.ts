import { IDoctor } from '../../doctor/models/IDoctor';
import { IDoctorSchedule } from '../../doctor/models/IDoctorSchedule';
import { IPatient } from '../../patient/models/IPatient';
import { IQuickTest } from '../../quick-test/models/IQuickTest';
import { ISector } from '../../sector/models/ISector';
import { ISectorAttendance } from '../../sector/models/ISectorAttendance';
import { AttendanceStatus } from '../../../shared/enums/attendance-status.enum';
import { AttendanceType } from '../../../shared/enums/attendance-type-enum';

export interface IAttendance {
  attendanceId: string;

  attendanceNumber: number;

  doctorId: string;

  doctorScheduleId: string;

  doctorSchedule: IDoctorSchedule;

  doctor: IDoctor;

  sectors: ISector[];

  patientId: string;

  patient: IPatient;

  attendanceDate: string;

  attendanceTime: string;

  orderNumber: number;

  confirmedAt: Date;

  status: AttendanceStatus;

  type: AttendanceType;

  quickTests: IQuickTest[];

  sectorAttendances: ISectorAttendance[];

  technicianId: string;

  anamnesis: string;

  exams: string;

  prescription: string;

  weight: number;

  systolicBP: number;

  diastolicBP: number;

  quickTestId: string;

  updatedAt: Date;

  createdAt: Date;
}
