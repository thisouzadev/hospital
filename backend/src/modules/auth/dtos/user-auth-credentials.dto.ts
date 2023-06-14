import {
  IsString,
  // Matches,
  MaxLength,
  MinLength,
  Length,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @Length(11)
  cpf: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'senha muito simples!',
  // })
  senha: string;
}
