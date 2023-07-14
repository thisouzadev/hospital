import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IState } from '../models/IState';

@Entity('states')
export class State implements IState {
  @PrimaryColumn({ name: 'state_id' })
  stateId: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;
}
