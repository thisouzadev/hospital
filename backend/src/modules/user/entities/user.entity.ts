import { IsNotEmpty, IsString } from 'class-validator';
import { Employee } from '../../employee/entities/employee.entity';
import * as bcrypt from 'bcrypt';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  Medico = 'médico',
  Recepcionista = 'recepcionista',
  Farmaceutico = 'farmaceutico',
  Admin = 'administrador',
  HospitalAdmin = 'administrador de hospital',
  SuperAdmin = 'administrador do sistema',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({ type: 'enum', enum: UserRole })
  @IsNotEmpty()
  @IsString()
  role: UserRole;

  @Column()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ default: true })
  active: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
}
