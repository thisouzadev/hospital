import { IsNotEmpty } from 'class-validator';

export class CreateHospitalDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  endereco: string;
}
