import { User } from 'src/modules/user/entities/user.entity';

export class AuthReturnDto {
  accessToken: string;
  user: User;
}
