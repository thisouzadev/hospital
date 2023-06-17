import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('states')
export class State {
  @PrimaryColumn({ name: 'state_id' })
  stateId: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;
}
