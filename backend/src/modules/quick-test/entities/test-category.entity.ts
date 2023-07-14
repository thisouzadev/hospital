import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ITestCategory } from '../models/ITestCategory';

@Entity('test_categories')
export class TestCategory implements ITestCategory {
  @PrimaryGeneratedColumn('uuid', { name: 'test_category_id' })
  testCategoryId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false, name: 'is_multiple' })
  isMultiple: boolean;

  @Column({ default: 'teste', name: 'test_list' })
  testList: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
