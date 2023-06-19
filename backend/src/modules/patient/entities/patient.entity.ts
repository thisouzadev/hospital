import { MaritalState } from '../../../shared/enums/marital-states.enum';
import { Race } from '../../../shared/enums/race.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPatient } from '../../../shared/models/patient/patient.interface';

@Entity('patients')
export class Patient implements IPatient {
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

  @Column({
    name: 'marital_state',
    type: 'enum',
    enum: MaritalState,
  })
  maritalState: MaritalState;

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
