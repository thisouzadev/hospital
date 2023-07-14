import { IEmployee } from '../../employee/models/IEmployee';
import { UserRole } from '../../../shared/enums/user-role.enum';

export interface IUser {
  userId: string;

  role: UserRole;

  email: string;

  password: string;

  active: boolean;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  employee: IEmployee;
}
