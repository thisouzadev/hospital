import { TestResultType } from '../../../shared/enums/test-result.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuickTest } from './quick-test.entity';
import { ITestResult } from '../models/ITestResult';

@Entity('test_result')
export class TestResult implements ITestResult {
  @PrimaryGeneratedColumn('uuid', { name: 'test_result_id' })
  testResultId: string;

  @Column({ name: 'quick_test_id' })
  quickTestId: string;

  @ManyToOne(() => QuickTest, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'quick_test_id',
    referencedColumnName: 'quickTestId',
  })
  quickTest: QuickTest;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: TestResultType })
  result: TestResultType;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
