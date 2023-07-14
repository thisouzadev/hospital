import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { Address } from '../../address/entities/address.entity';

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn('uuid', { name: 'hospital_id' })
  hospitalId: string;

  @Column()
  hospitalName: string;

  @Column({ nullable: true })
  director: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @JoinColumn({ name: 'address_id', referencedColumnName: 'addressId' })
  address: Address;

  @OneToMany(() => Employee, (employee) => employee.hospital)
  employees: Employee[];
}
