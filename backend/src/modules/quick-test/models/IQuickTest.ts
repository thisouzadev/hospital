import { IAttendance } from '../../attendance/models/IAttendance';
import { IEmployee } from '../../employee/models/IEmployee';
import { IPatient } from '../../patient/models/IPatient';
import { ITestCategory } from './ITestCategory';
import { ITestResult } from './ITestResult';

export interface IQuickTest {
  quickTestId: string;

  quickTestNumber: number;

  testCategoryId: string;

  category: ITestCategory;

  results: ITestResult[];

  patientId: string;

  patient: IPatient;

  responsibleId: string;

  responsible: IEmployee;

  attendanceId: string;

  attendance: IAttendance;

  reqUnit: string;

  docNumber: string;

  date: string;

  createdAt: Date;
}
