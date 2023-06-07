// src/modules/anamnese/entities/anamnese.entity.ts

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';

@Entity()
export class Anamnese {
  @PrimaryGeneratedColumn()
  anamneseID: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.anamneses)
  paciente: Paciente;

  @Column()
  data: Date;

  @Column()
  informacoes: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
