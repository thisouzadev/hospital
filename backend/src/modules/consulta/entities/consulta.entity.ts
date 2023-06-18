import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
