import { IsNotEmpty } from 'class-validator';

export class CreateHospitalDto {
  @IsNotEmpty({ message: 'O nome da unidade não pode estar vazio' })
  hospitalName: string;

  @IsNotEmpty({ message: 'O nome do diretor não pode estar vazio' })
  director: string;
}
