import { Doctor } from '../../../modules/doctor/entities/doctor.entity';
import { Patient } from '../../../modules/patient/entities/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorSchedule } from '../../doctor/entities/doctor-schedule.entity';
import { AttendanceStatus } from '../../../shared/enums/attendance-status.enum';
import { AttendanceType } from '../../../shared/enums/attendance-type-enum';
import { QuickTest } from '../../../modules/quick-test/entities/quick-test.entity';
import { Sector } from '../../../modules/sector/entities/sector.entity';
import { SectorAttendance } from '../../../modules/sector/entities/sector-attendance.entity';
import { IAttendance } from '../models/IAttendance';

@Entity('attendances')
export class Attendance implements IAttendance {
  @PrimaryGeneratedColumn('uuid', { name: 'attendance_id' })
  attendanceId: string;

  @Column({ name: 'attendance_number' })
  @Generated('increment')
  attendanceNumber: number;

  @Column('uuid', { name: 'doctor_id', nullable: true })
  doctorId: string;

  @Column('uuid', { name: 'doctor_schedule_id', nullable: true })
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

  @ManyToMany(() => Sector, (sector) => sector)
  sectors: Sector[];

  @Column('uuid', { name: 'patient_id' })
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

  @OneToMany(
    () => SectorAttendance,
    (sectorAttendance) => sectorAttendance.attendance,
  )
  sectorAttendances: SectorAttendance[];

  @Column('uuid', { name: 'technician_id', nullable: true })
  technicianId: string;

  @Column({ nullable: true })
  anamnesis: string;

  @Column({ nullable: true })
  exams: string;

  @Column({ nullable: true })
  prescription: string;

  @Column({ name: 'weight', nullable: true })
  weight: number;

  @Column({ name: 'systolic_bp', nullable: true })
  systolicBP: number;

  @Column({ name: 'diastolic_bp', nullable: true })
  diastolicBP: number;

  @Column('uuid', { name: 'quick_test_id', nullable: true })
  quickTestId: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
