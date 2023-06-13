import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn()
  hospitalID: number;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Funcionario, (funcionario) => funcionario.hospital)
  funcionarios: Funcionario[];
}
