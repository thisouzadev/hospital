import { IsInt, IsOptional, IsString, Max } from 'class-validator';

export class UpdateTechnicianAttendanceDto {
  @IsOptional()
  @IsInt()
  weight?: number;

  @IsOptional()
  @IsInt()
  systolicBP?: number;

  @IsOptional()
  @IsInt()
  diastolicBP?: number;

  @IsOptional()
  @IsString()
  // @Max(2000, {
  //   message:
  //     'O campo de Outras Considerações não pode ter mais de 2000 caracteres',
  // })
  technicianReport?: string;
}
