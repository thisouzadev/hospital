import { IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  role: UserRole;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
