import { TestResultType } from '../../../shared/enums/test-result.enum';
import { IQuickTest } from './IQuickTest';

export interface ITestResult {
  testResultId: string;

  quickTestId: string;

  quickTest: IQuickTest;

  name: string;

  result: TestResultType;

  createdAt: Date;
}
