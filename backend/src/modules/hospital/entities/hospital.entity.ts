import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn('uuid', { name: 'hospital_id' })
  hospitalId: string;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Employee, (employee) => employee.hospital)
  employees: Employee[];
}
