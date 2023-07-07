import { Doctor } from '../../../modules/doctor/entities/doctor.entity';
import { Patient } from '../../../modules/patient/entities/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorSchedule } from '../../doctor/entities/doctor-schedule.entity';
import { AttendanceStatus } from '../../../shared/enums/attendance-status.enum';
import { AttendanceType } from '../../../shared/enums/attendance-type-enum';
import { QuickTest } from 'src/modules/quick-test/entities/quick-test.entity';

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn('uuid', { name: 'attendance_id' })
  attendanceId: string;

  @Column({ name: 'attendance_number' })
  @Generated('increment')
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

  @Column({
    type: 'enum',
    enum: AttendanceType,
    default: AttendanceType.STANDARD,
  })
  type: AttendanceType;

  @OneToMany(() => QuickTest, (quickTests) => quickTests.attendance)
  quickTests: QuickTest[];

  @Column({ name: 'technician_id', nullable: true })
  technicianId: string;

  @Column({ name: 'technician_report', nullable: true })
  technicianReport: string;

  @Column({ name: 'weight', nullable: true })
  weight: number;

  @Column({ name: 'systolic_bp', nullable: true })
  systolicBP: number;

  @Column({ name: 'diastolic_bp', nullable: true })
  diastolicBP: number;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
