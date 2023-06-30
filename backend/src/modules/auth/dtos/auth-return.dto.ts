import { User } from '../../user/entities/user.entity';

export class AuthReturnDto {
  accessToken: string;
  user: User;
}
