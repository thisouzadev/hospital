import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';

@Entity()
export class Transferencia {
  @PrimaryGeneratedColumn()
  transferenciaID: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.transferencias)
  paciente: Paciente;

  @Column()
  data: Date;

  @Column()
  motivo: string;

  @Column()
  destino: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
