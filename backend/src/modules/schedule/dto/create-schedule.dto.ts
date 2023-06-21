import { ScheduleStatus } from '../entities/schedule.entity';

export class CreateScheduleDto {
  doctorId: string;

  patientId: string;

  scheduleDate: Date;

  scheduleTime: Date;

  orderNumber: number;

  confirmedAt: Date;

  status: ScheduleStatus;

  createdAt: Date;
}
