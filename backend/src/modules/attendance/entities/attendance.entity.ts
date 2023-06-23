import { Doctor } from 'src/modules/doctor/entities/doctor.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum AttendanceStatus {
  SCHEDULED = 'agendado',
  CONFIRMED = 'confirmado',
  FINISHED = 'finalizado',
  CANCELED = 'cancelado',
}

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn('uuid', { name: 'attendance_id' })
  attendanceId: string;

  @Column({ name: 'doctor_id', nullable: true })
  doctorId: string;

  @ManyToOne(() => Doctor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id', referencedColumnName: 'doctorId' })
  doctor: Doctor;

  @Column({ name: 'patient_id' })
  patientId: string;

  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id', referencedColumnName: 'patientId' })
  patient: Patient;

  @Column({ name: 'attendance_date', type: 'date' })
  attendanceDate: Date;

  @Column({ name: 'attendance_time', type: 'time', nullable: true })
  attendanceTime: Date;

  @Column({ name: 'order_number', nullable: true })
  orderNumber: number;

  @Column({ name: 'confirmed_at', nullable: true })
  confirmedAt: Date;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.SCHEDULED,
  })
  status: AttendanceStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
