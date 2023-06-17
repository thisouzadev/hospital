import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hospital } from '../../hospital/entities/hospital.entity';
import { Role } from '../../../shared/enums/role.enum';

@Entity()
export class Funcionario {
  @PrimaryGeneratedColumn('uuid')
  funcionarioID: string;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  role: Role;

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

  @ManyToOne(() => Hospital, (hospital) => hospital.funcionarios)
  @JoinColumn({ name: 'hospitalID', referencedColumnName: 'hospitalID' })
  hospital: Hospital;
}
