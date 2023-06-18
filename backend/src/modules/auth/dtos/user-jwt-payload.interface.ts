import { UserRole } from 'src/modules/user/entities/user.entity';

export interface UserJwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}
