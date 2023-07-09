import { IsUUID } from 'class-validator';

export class SectorAttendanceDto {
  @IsUUID()
  attendanceId: string;

  @IsUUID()
  sectorId: string;
}
