import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateDoctorScheduleDto {
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsInt()
  @Max(6)
  @Min(0)
  weekDay: number;

  @IsString()
  startAt: string;

  @IsString()
  endAt: string;

  @IsInt()
  @Min(0)
  vacancies: number;
}
