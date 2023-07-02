import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from '../../../shared/dtos/page.dto';
import { PageMetaDto } from '../../../shared/presenters/page-meta-parameters.dto';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { ListAttendanceQueryDto } from '../dto/list-attendances-query.dto';
import { UpdateAttendanceDto } from '../dto/update-attendance.dto';
import { Attendance } from '../entities/attendance.entity';
import { AttendanceStatus } from '../../../shared/enums/attendance-status.enum';
import { AttendanceType } from '../../../shared/enums/attendance-type-enum';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}
  async create(createAttendanceDto: CreateAttendanceDto) {
    const attendance = this.attendanceRepository.create(createAttendanceDto);
    await this.attendanceRepository.save(attendance);

    return attendance;
  }

  async findAll(query: ListAttendanceQueryDto) {
    const { attendanceDate, doctorId, patientId, status } = query;
    const { take, page } = query;
    const skip = query.getSkip();
    const { orderBy, orderType } = query;

    const [entities, itemCount] = await this.attendanceRepository.findAndCount({
      where: { attendanceDate, doctorId, patientId, status },
      take,
      skip,
      relations: ['patient', 'doctor', 'doctor.employee'],
      order: {
        // status: 'DESC',
        [orderBy]: orderType,
        confirmedAt: 'ASC',
        updatedAt: 'ASC',
      },
    });

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: { take, page },
      itemCount,
    });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(attendanceId: string) {
    const attendance = await this.attendanceRepository.findOne({
      where: { attendanceId },
      relations: ['patient', 'doctor', 'doctor.employee'],
    });

    if (!attendance) {
      throw new NotFoundException('Atendimento não encontrado');
    }
    return attendance;
  }

  async update(attendanceId: string, updateAttendanceDto: UpdateAttendanceDto) {
    const attendance = await this.attendanceRepository.findOneBy({
      attendanceId,
    });

    if (!attendance) {
      throw new NotFoundException('Atendimento não encontrado');
    }

    Object.assign(attendance, updateAttendanceDto);

    await this.attendanceRepository.save(attendance);
    return attendance;
  }

  async changeStatus(
    attendanceId: string,
    status: AttendanceStatus,
    type: AttendanceType,
  ) {
    const attendance = await this.attendanceRepository.findOneBy({
      attendanceId,
    });

    if (!attendance) {
      throw new NotFoundException('Atendimento não encontrado');
    }

    if (attendance.status === AttendanceStatus.FINISHED) {
      throw new BadRequestException('Este atendimento já foi finalizado');
    }

    if (status === attendance.status) {
      throw new BadRequestException(
        `O atendimento já se encontra com o status ${status}`,
      );
    }

    if (status) {
      attendance.status = status;
    }
    if (type) {
      attendance.type = type;
    }

    if (status === AttendanceStatus.CONFIRMED) {
      attendance.confirmedAt = new Date();
    }

    await this.attendanceRepository.save(attendance);

    return attendance;
  }

  async remove(attendanceId: string) {
    const attendance = await this.attendanceRepository.findOneBy({
      attendanceId,
    });

    if (!attendance) {
      throw new NotFoundException('Atendimento não encontrado');
    }

    await this.attendanceRepository.remove(attendance);
  }
}
