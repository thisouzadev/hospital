import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { ListAttendanceQueryDto } from '../dto/list-attendances-query.dto';
import { UpdateAttendanceDto } from '../dto/update-attendance.dto';
import { Attendance } from '../entities/attendance.entity';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}
  async create(createAttendanceDto: CreateAttendanceDto) {
    const attendance = this.attendanceRepository.create(createAttendanceDto);
    await this.attendanceRepository.save(attendance);

    return attendance;
  }

  findAll(query: ListAttendanceQueryDto) {
    console.log(this.request.headers);
    const { attendanceDate, doctorId, patientId, status } = query;
    const { page = 1, perPage = 10 } = query;
    const { orderBy, orderType } = query;

    return this.attendanceRepository.find({
      where: { attendanceDate, doctorId, patientId, status },
      take: perPage,
      skip: perPage * (page - 1),
      relations: ['patient', 'doctor', 'doctor.employee'],
      order: {
        [orderBy]: orderType,
      },
    });
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
