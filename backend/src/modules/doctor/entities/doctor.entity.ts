import { State } from 'src/modules/address/entities/state.entity';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid', { name: 'doctor_id' })
  doctorId: string;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @OneToOne(() => Employee, (employee) => employee.doctor)
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
