import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissaoAcesso } from '../../permissaoAcesso/entities/permissao-acesso.entity';

@Entity()
export class Funcionario {
  @PrimaryGeneratedColumn()
  funcionarioID: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  cargo: string;

  @Column()
  responsabilidades: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(
    () => PermissaoAcesso,
    (permissaoAcesso) => permissaoAcesso.funcionario,
  )
  permissoesAcesso: PermissaoAcesso[];
}
