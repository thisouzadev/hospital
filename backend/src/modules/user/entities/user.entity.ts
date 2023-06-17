import { IsNotEmpty, IsString } from 'class-validator';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  Medico = 'médico',
  Recepcionista = 'recepcionista',
  Farmaceutico = 'farmaceutico',
  Admin = 'administrador',
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
}
