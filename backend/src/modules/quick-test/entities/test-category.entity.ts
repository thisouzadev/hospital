import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test_categories')
export class TestCategory {
  @PrimaryGeneratedColumn('uuid', { name: 'test_category_id' })
  testCategoryId: string;

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
