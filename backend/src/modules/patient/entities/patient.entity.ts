import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Patient {
  @PrimaryGeneratedColumn('uuid', { name: 'patient_id' })
  patientId: number;

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

  @Column()
  ethnics: string;

  @Column()
  estadoCivil: string;

  @Column({ name: 'place_of_birth' })
  placeOfBirth: string;
}
