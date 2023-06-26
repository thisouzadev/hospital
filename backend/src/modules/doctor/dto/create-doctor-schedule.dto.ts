import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorScheduleDto {
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsString()
  weekDay: number;

  @IsString()
  startAt: string;

  @IsString()
  endAt: string;

  @IsInt()
  vacancies: number;
}
