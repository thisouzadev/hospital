import { UserRole } from '../enums/user-role.enum';

export interface ICreateUserDto {
  role: UserRole;

  email: string;

  password: string;
}
