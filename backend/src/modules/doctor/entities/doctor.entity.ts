import { State } from '../../address/entities/state.entity';
import { Employee } from '../../employee/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DoctorSchedule } from './doctor-schedule.entity';
import { IDoctor } from '../models/IDoctor';

@Entity('doctors')
export class Doctor implements IDoctor {
  @PrimaryGeneratedColumn('uuid', { name: 'doctor_id' })
  doctorId: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @OneToOne(() => Employee, (employee) => employee.doctor, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'employeeId' })
  employee: Employee;

  @Column()
  specialty: string;

  @Column()
  crm: string;

  @Column({ name: 'crm_state_id' })
  crmStateId: number;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'crm_state_id', referencedColumnName: 'stateId' })
  crmState: State;

  @OneToMany(() => DoctorSchedule, (schedule) => schedule.doctor)
  schedules: DoctorSchedule[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
