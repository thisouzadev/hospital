import {
  IsString,
  // Matches,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'senha muito simples!',
  // })
  password: string;
}
