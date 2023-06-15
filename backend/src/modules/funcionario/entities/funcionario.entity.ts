import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { PermissaoAcesso } from '../../permissaoAcesso/entities/permissao-acesso.entity';
import { Hospital } from 'src/modules/hospital/entities/hospital.entity';
import { Consulta } from 'src/modules/consulta/entities/consulta.entity';
import { Role } from 'src/shared/enums/role.enum';

@Entity()
export class Funcionario {
  @PrimaryGeneratedColumn()
  funcionarioID: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  rg: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  role: Role;

  @Column()
  @IsNotEmpty()
  @IsString()
  especialidade: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column()
  @IsString()
  senha: string;

  async gerarHashSenha(): Promise<void> {
    const saltRounds = 10;
    this.senha = await bcrypt.hash(this.senha, saltRounds);
  }

  @Column({ default: true })
  ativo: boolean;

  @Column()
  @IsNotEmpty()
  hospitalID: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @OneToMany(
    () => PermissaoAcesso,
    (permissaoAcesso) => permissaoAcesso.funcionario,
  )
  permissoesAcesso: PermissaoAcesso[];

  @ManyToOne(() => Hospital, (hospital) => hospital.funcionarios)
  @IsNotEmpty()
  @JoinColumn({ name: 'hospitalID', referencedColumnName: 'hospitalID' })
  hospital: Hospital;

  @ManyToMany(() => Consulta, (consulta) => consulta.funcionario)
  consultas: Consulta[];
}
