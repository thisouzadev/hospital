import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

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
  @MaxLength(2000, {
    message: 'O campo de Anamnese não pode ter mais de 2000 caracteres',
  })
  anamnesis?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000, {
    message: 'O campo de Exame não pode ter mais de 2000 caracteres',
  })
  exams?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000, {
    message: 'O campo de Prescrição não pode ter mais de 2000 caracteres',
  })
  prescription?: string;

  @IsUUID()
  @IsOptional()
  quickTestId?: string;
}
