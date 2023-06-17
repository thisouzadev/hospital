import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { State } from './state.entity';

@Entity('cities')
export class City {
  @PrimaryColumn({ name: 'city_id' })
  cityId: number;

  @Column({ name: 'state_id' })
  stateId: number;

  @Column({ name: 'ibge_code' })
  ibgeCode: number;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'stateId' })
  state: State;

  @Column()
  name: string;
}
