import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transferencia {
  @PrimaryGeneratedColumn()
  transferenciaID: number;

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
