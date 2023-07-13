import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSectorDto {
  @IsString()
  @MinLength(3, {
    message: 'O nome do setor precisa ter ao menos 3 caracteres',
  })
  name: string;

  @IsString()
  @MaxLength(50, {
    message: 'A descrição do setor precisa não pode ter mais de 50 caracteres',
  })
  description: string;
}
