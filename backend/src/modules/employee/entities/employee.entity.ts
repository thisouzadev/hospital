import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hospital } from '../../hospital/entities/hospital.entity';
import { Role } from '../../../shared/enums/role.enum';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_id' })
  employeeId: string;

  @Column()
  name: string;

  // @Column({ name: 'user_id' })
  // userId: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  especialidade: string;

  @Column({ default: true })
  ativo: boolean;

  @Column()
  hospitalID: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Hospital, (hospital) => hospital.employees)
  @JoinColumn({ name: 'hospitalID', referencedColumnName: 'hospitalID' })
  hospital: Hospital;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;
}
