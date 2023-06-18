import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Race {
  BRANCA = 'branca',
  AMARELA = 'amarela',
  PRETA = 'preta',
  PARDA = 'parda',
  INDIGENA = 'indígena',
  NI = 'não informada',
}

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid', { name: 'patient_id' })
  patientId: string;

  @Column()
  name: string;

  @Column()
  birth: Date;

  @Column({ nullable: true, default: '' })
  cpf: string;

  @Column({ nullable: true, default: '' })
  rg: string;

  @Column({ nullable: true, default: '' })
  responsible: string;

  @Column({ nullable: true, default: '' })
  cns: string;

  @Column({ nullable: true, default: '' })
  mother: string;

  @Column({ nullable: true, default: '' })
  father: string;

  @Column({ nullable: true, default: '' })
  occupation: string;

  @Column()
  gender: string;

  @Column({ nullable: true, type: 'enum', enum: Race, default: Race.NI })
  race: Race;

  @Column({ name: 'marital_state', nullable: true, default: '' })
  maritalState: string;

  @Column({ name: 'place_of_birth', nullable: true, default: '' })
  placeOfBirth: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;
}
