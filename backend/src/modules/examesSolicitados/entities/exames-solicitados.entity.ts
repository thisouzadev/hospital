import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExamesSolicitados {
  @PrimaryGeneratedColumn()
  examesSolicitadosID: number;

  @Column()
  data: Date;

  @Column()
  descricao: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
