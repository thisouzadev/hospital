import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ScheduleStatus {
  SCHEDULED = 'agendado',
  CONFIRMED = 'confirmado',
  FINISHED = 'finalizado',
  CANCELED = 'cancelado',
}

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid', { name: 'schedule_id' })
  scheduleId: string;

  @Column({ name: 'doctor_id', nullable: true })
  doctorId: string;

  @Column({ name: 'patient_id' })
  patientId: string;

  @Column({ name: 'schedule_date', type: 'date' })
  scheduleDate: Date;

  @Column({ name: 'schedule_time', type: 'time', nullable: true })
  scheduleTime: Date;

  @Column({ name: 'order_number', nullable: true })
  orderNumber: number;

  @Column({ name: 'confirmed_at', nullable: true })
  confirmedAt: Date;

  @Column({
    type: 'enum',
    enum: ScheduleStatus,
    default: ScheduleStatus.SCHEDULED,
  })
  status: ScheduleStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
