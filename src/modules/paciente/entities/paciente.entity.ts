import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Endereco } from '../../endereco/entities/endereco.entity';
import { Transferencia } from '../../transferencia/entities/transferencia.entity';
import { EvolucaoPrescricao } from '../../evolucaoPrescricao/entities/evolucao-prescricao.entity';
import { PrescricaoInicial } from '../../prescricaoInicial/entities/prescricao-inicial.entity';
import { Consulta } from '../../consulta/entities/consulta.entity';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  pacienteID: number;

  @Column()
  nome: string;

  @Column()
  dataNascimento: Date;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  responsavel: string;

  @Column()
  cns: string;

  @Column()
  mae: string;

  @Column()
  pai: string;

  @Column()
  profissao: string;

  @Column()
  sexo: string;

  @Column()
  racaCor: string;

  @Column()
  idade: number;

  @Column()
  estadoCivil: string;

  @Column()
  naturalidade: string;

  @ManyToOne(() => Endereco, (endereco) => endereco.pacientes)
  endereco: Endereco;

  @OneToMany(() => Transferencia, (transferencia) => transferencia.paciente)
  transferencias: Transferencia[];

  @OneToMany(
    () => EvolucaoPrescricao,
    (evolucaoPrescricao) => evolucaoPrescricao.paciente,
  )
  evolucoesPrescricao: EvolucaoPrescricao[];

  @OneToMany(
    () => PrescricaoInicial,
    (prescricaoInicial) => prescricaoInicial.paciente,
  )
  prescricoesIniciais: PrescricaoInicial[];

  @OneToMany(() => Consulta, (consulta) => consulta.paciente)
  consultas: Consulta[];
}
