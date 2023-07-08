import { IsString, MinLength } from 'class-validator';

export class CreateSectorDto {
  @IsString()
  @MinLength(3, {
    message: 'O nome do setor precisa ter ao menos 3 caracteres',
  })
  name: string;
}
