import { Employee } from '../../../modules/employee/entities/employee.entity';
import { TestResultType } from '../../../shared/enums/test-result.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from '../../../modules/patient/entities/patient.entity';
import { Test } from './test.entity';
import { Attendance } from '../../../modules/attendance/entities/attendance.entity';

@Entity('test_results')
export class TestResult {
  @PrimaryGeneratedColumn('uuid', { name: 'test_result_id' })
  testResultId: string;

  @PrimaryGeneratedColumn({ name: 'test_result_number' })
  testResultNumber: number;

  @Column({ name: 'test_id' })
  testId: string;

  @ManyToOne(() => Test)
  @JoinColumn({
    name: 'test_id',
    referencedColumnName: 'testId',
  })
  test: Test;

  @Column({ type: 'enum', enum: TestResultType })
  result: TestResultType;

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
