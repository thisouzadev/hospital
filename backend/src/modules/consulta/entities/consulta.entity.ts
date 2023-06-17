import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn()
  consultaID: number;

  @Column()
  data: Date;

  @Column()
  sintomas: string;

  @Column()
  diagnostico: string;

  @Column()
  tratamento: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.consultas)
  paciente: Paciente;
}
