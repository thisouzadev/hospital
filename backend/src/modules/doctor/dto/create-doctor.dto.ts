import { IsNumber, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  specialty: string;

  @IsString()
  crm: string;

  @IsNumber()
  crmStateId: number;
}
