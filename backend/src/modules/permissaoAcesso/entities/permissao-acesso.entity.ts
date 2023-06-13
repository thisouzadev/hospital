import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

@Entity()
export class PermissaoAcesso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipoAcesso: string;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.permissoesAcesso)
  funcionario: Funcionario;
}
