import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn('uuid', { name: 'test_id' })
  testId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
