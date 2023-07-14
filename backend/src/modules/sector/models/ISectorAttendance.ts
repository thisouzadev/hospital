import { IAttendance } from '../../attendance/models/IAttendance';
import { SectorAttendanceStatus } from '../../../shared/enums/sector-attendance-status.enum';
import { ISector } from './ISector';

export interface ISectorAttendance {
  sectorAttendanceId: string;

  sectorId: string;

  attendanceId: string;

  sector: ISector;

  attendance: IAttendance;

  enteredAt: Date;

  attendedAt: Date;

  leftAt: Date;

  status: SectorAttendanceStatus;

  isFinished: boolean;
}
