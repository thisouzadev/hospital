import { UserRole } from 'src/shared/enums/user-role.enum';

export interface UserJwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}
