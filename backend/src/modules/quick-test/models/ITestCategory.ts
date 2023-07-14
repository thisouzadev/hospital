export interface ITestCategory {
  testCategoryId: string;

  name: string;

  description: string;

  isMultiple: boolean;

  testList: string;

  createdAt: Date;
}
