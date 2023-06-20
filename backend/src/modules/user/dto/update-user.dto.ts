import { IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/shared/enums/user-role.enum';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  role: UserRole;

  @IsNotEmpty()
  @IsString()
  email: string;
}
