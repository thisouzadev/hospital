import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectorAttendanceStatus } from 'src/shared/enums/sector-attendance-status.enum';
import { Repository } from 'typeorm';
import { SectorAttendanceDto } from '../dto/sector-attendance.dto';
import { MoveSectorDto } from '../dto/move-sector.dto';
import { SectorAttendance } from '../entities/sector-attendance.entity';
import { Attendance } from '../../../modules/attendance/entities/attendance.entity';
import { AttendanceStatus } from 'src/shared/enums/attendance-status.enum';

interface LeftSectorStatusDto extends SectorAttendanceDto {
  status?: SectorAttendanceStatus;
}

@Injectable()
export class SectorAttendanceService {
  constructor(
    @InjectRepository(SectorAttendance)
    private sectorAttendanceRepository: Repository<SectorAttendance>,
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async startAttendance({ attendanceId, sectorId }: SectorAttendanceDto) {
    const sectorAttendance = await this.sectorAttendanceRepository.findOneBy({
      attendanceId,
      sectorId,
    });

    if (!sectorAttendance) {
      throw new NotFoundException(
        'O atendimento não foi encontrado neste setor',
      );
    }

    sectorAttendance.status = SectorAttendanceStatus.ATTENDING;

    await this.sectorAttendanceRepository.save(sectorAttendance);

    return sectorAttendance;
  }

  async enterSector({ attendanceId, sectorId }: SectorAttendanceDto) {
    const sectorAttendance = this.sectorAttendanceRepository.create({
      sectorId,
      attendanceId,
      status: SectorAttendanceStatus.WAITING,
    });

    await this.sectorAttendanceRepository.save(sectorAttendance);

    return sectorAttendance;
  }

  async leftSector({
    attendanceId,
    sectorId,
    status = SectorAttendanceStatus.FINISHED,
  }: LeftSectorStatusDto) {
    const fromSector = await this.sectorAttendanceRepository.findOne({
      where: [
        {
          attendanceId,
          sectorId,
          status: SectorAttendanceStatus.WAITING,
        },
        {
          attendanceId,
          sectorId,
          status: SectorAttendanceStatus.ATTENDING,
        },
      ],
    });

    if (!fromSector) {
      throw new NotFoundException('O atendimento não se encontra neste setor');
    }

    if (status === SectorAttendanceStatus.FINISHED) {
      const attendance = await this.attendanceRepository.findOneBy({
        attendanceId,
      });

      if (!attendance) {
        throw new NotFoundException('Atendimento não encontrado');
      }
      attendance.status = AttendanceStatus.FINISHED;
      await this.attendanceRepository.save(attendance);
    }

    fromSector.leftAt = new Date();
    fromSector.status = status;

    await this.sectorAttendanceRepository.save(fromSector);
  }

  async moveSector({ fromSectorId, toSectorId, attendanceId }: MoveSectorDto) {
    await this.leftSector({
      sectorId: fromSectorId,
      attendanceId,
      status: SectorAttendanceStatus.FORWARDED,
    });
    return this.enterSector({ sectorId: toSectorId, attendanceId });
  }
}
