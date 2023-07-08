import { IsUUID } from 'class-validator';

export class MoveSectorDto {
  @IsUUID()
  attendanceId: string;

  @IsUUID()
  fromSectorId: string;

  @IsUUID()
  toSectorId: string;
}
