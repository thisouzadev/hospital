import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAddress } from '../models/IAddress';
import { City } from './city.entity';
import { State } from './state.entity';

@Entity('addresses')
export class Address implements IAddress {
  @PrimaryGeneratedColumn('uuid', { name: 'address_id' })
  addressId: string;

  @Column()
  street: string;

  @Column({ name: 'street_number' })
  streetNumber: string;

  @Column()
  district: string;

  @Column({ name: 'city_id' })
  cityId: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'cityId' })
  city: City;

  @Column({ name: 'state_id' })
  stateId: number;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'stateId' })
  state: State;

  @Column()
  cep: string;
}
