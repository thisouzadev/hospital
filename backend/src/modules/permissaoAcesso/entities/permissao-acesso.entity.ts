import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PermissaoAcesso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipoAcesso: string;
}
