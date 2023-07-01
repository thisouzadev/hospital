import { Doctor } from '../../../modules/doctor/entities/doctor.entity';
import { Patient } from '../../../modules/patient/entities/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorSchedule } from '../../doctor/entities/doctor-schedule.entity';
import { AttendanceStatus } from '../../../shared/enums/attendance-status.enum';

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn('uuid', { name: 'attendance_id' })
  attendanceId: string;

  @PrimaryGeneratedColumn({ name: 'attendance_number' })
  attendanceNumber: number;

  @Column({ name: 'doctor_id', nullable: true })
  doctorId: string;

  @Column({ name: 'doctor_schedule_id', nullable: true })
  doctorScheduleId: string;

  @ManyToOne(() => DoctorSchedule, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'doctor_schedule_id',
    referencedColumnName: 'scheduleId',
  })
  doctorSchedule: DoctorSchedule;

  @ManyToOne(() => Doctor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id', referencedColumnName: 'doctorId' })
  doctor: Doctor;

  @Column({ name: 'patient_id' })
  patientId: string;

  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id', referencedColumnName: 'patientId' })
  patient: Patient;

  @Column({ name: 'attendance_date', type: 'date' })
  attendanceDate: string;

  @Column({ name: 'attendance_time', type: 'time', nullable: true })
  attendanceTime: string;

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

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
