import { IHospital } from '@modules/hospital/models/IHospital';
import { ISector } from '@modules/sector/models/ISector';
import { ISectorAttendance } from '@modules/sector/models/ISectorAttendance';
import { IAttendance } from '@modules/attendance/models/IAttendance';
import { IAddress } from '@modules/address/models/IAddress';
import { IState } from '@modules/address/models/IState';
import { ICity } from '@modules/address/models/ICity';
import { ITestCategory } from '@modules/quick-test/models/ITestCategory';
import { IQuickTest } from '@modules/quick-test/models/IQuickTest';
import { ITestResult } from '@modules/quick-test/models/ITestResult';
import { IDoctor } from '@modules/doctor/models/IDoctor';
import { IDoctorSchedule } from '@modules/doctor/models/IDoctorSchedule';
import { IEmployee } from '@modules/employee/models/IEmployee';
import { IPatient } from '@modules/patient/models/IPatient';

export type {
  IHospital,
  ISector,
  ISectorAttendance,
  IAddress,
  ICity,
  IState,
  IQuickTest,
  ITestCategory,
  ITestResult,
  IDoctor,
  IDoctorSchedule,
  IEmployee,
  IAttendance,
  IPatient,
};
