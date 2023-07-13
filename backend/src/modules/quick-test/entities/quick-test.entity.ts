import { Employee } from '../../../modules/employee/entities/employee.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from '../../../modules/patient/entities/patient.entity';
import { Attendance } from '../../../modules/attendance/entities/attendance.entity';
import { TestCategory } from './test-category.entity';
import { TestResult } from './test-result.entity';

@Entity('quick_tests')
export class QuickTest {
  @PrimaryGeneratedColumn('uuid', { name: 'quick_test_id' })
  quickTestId: string;

  @Column({ name: 'quick_test_number' })
  @Generated('increment')
  quickTestNumber: number;

  @Column({ name: 'test_category_id' })
  testCategoryId: string;

  @ManyToOne(() => TestCategory)
  @JoinColumn({
    name: 'test_category_id',
    referencedColumnName: 'testCategoryId',
  })
  category: TestCategory;

  @OneToMany(() => TestResult, (schedule) => schedule.quickTest, {
    cascade: ['insert'],
  })
  results: TestResult[];

  @Column({ name: 'patient_id' })
  patientId: string;

  @ManyToOne(() => Patient)
  @JoinColumn({
    name: 'patient_id',
    referencedColumnName: 'patientId',
  })
  patient: Patient;

  @Column({ name: 'responsible_id' })
  responsibleId: string;

  @ManyToOne(() => Employee)
  @JoinColumn({
    name: 'responsible_id',
    referencedColumnName: 'employeeId',
  })
  responsible: Employee;

  @Column({ name: 'attendance_id' })
  attendanceId: string;

  @ManyToOne(() => Attendance)
  @JoinColumn({
    name: 'attendance_id',
    referencedColumnName: 'attendanceId',
  })
  attendance: Attendance;

  @Column({ name: 'req_unit', nullable: true })
  reqUnit: string;

  @Column({ name: 'doc_number', nullable: true })
  docNumber: string;

  @Column({ type: 'date' })
  date: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
