export interface ICreateScheduleDto {
  doctorId?: string;

  patientId: string;

  scheduleDate: Date;

  scheduleTime?: Date;

  orderNumber?: number;
}
