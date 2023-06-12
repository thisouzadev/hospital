import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';

@Entity()
export class ExamesSolicitados {
  @PrimaryGeneratedColumn()
  examesSolicitadosID: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.examesSolicitados)
  paciente: Paciente;

  @Column()
  data: Date;

  @Column()
  descricao: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
