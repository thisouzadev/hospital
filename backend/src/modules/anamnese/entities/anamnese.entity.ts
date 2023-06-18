import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Anamnese {
  @PrimaryGeneratedColumn()
  anamneseID: number;

  @Column()
  data: Date;

  @Column()
  informacoes: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
