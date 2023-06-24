import { Address } from '../../address/entities/address.entity';
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
import { User } from '../../user/entities/user.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_id' })
  employeeId: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column({ nullable: true })
  mat: string;

  @Column({ nullable: true })
  cns: string;

  @Column({ default: true })
  active: boolean;

  @Column({ name: 'hospital_id' })
  hospitalId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'left_at', nullable: true })
  leftAt: Date;

  @ManyToOne(() => Hospital, (hospital) => hospital.employees)
  @JoinColumn({ name: 'hospital_id', referencedColumnName: 'hospitalId' })
  hospital: Hospital;

  @OneToOne(() => Doctor, (doctor) => doctor.employee, {
    cascade: ['insert', 'update'],
  })
  doctor: Doctor;

  @OneToOne(() => User, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;

  @OneToOne(() => Address, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'addressId' })
  address: Address;
}
