import { MaritalState } from '../../../shared/enums/marital-states.enum';
import { Race } from '../../../shared/enums/race.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IPatient } from '../../../shared/models/patient/patient.interface';
import { Address } from '../../../modules/address/entities/address.entity';
import { Gender } from '../../../shared/enums/gender.enum';
import { Attendance } from '../../attendance/entities/attendance.entity';
import { QuickTest } from '../../../modules/quick-test/entities/quick-test.entity';

@Entity('patients')
export class Patient implements IPatient {
  @PrimaryGeneratedColumn('uuid', { name: 'patient_id' })
  patientId: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  birth: string;

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

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({ nullable: true })
  phone: string;

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

  @OneToOne(() => Address, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'addressId' })
  address: Address;

  @OneToMany(() => Attendance, (attendance) => attendance.patient)
  attendances: Attendance[];

  @OneToMany(() => QuickTest, (quickTest) => quickTest.patient)
  quickTests: QuickTest[];

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
